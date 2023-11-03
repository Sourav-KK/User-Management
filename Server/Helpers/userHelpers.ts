import { Request, Response } from "express";
import user from "../Models/userModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import JWT, { JwtPayload } from "jsonwebtoken";
import {
  loginValidator,
  signupValidator,
  updateValidator,
} from "./FormValidator";
import multer from "multer";

dotenv.config();

// const upload = multer({ dest: "uploads/" });

const salting = async () => {
  return await bcrypt.genSalt(Number(process.env.SALT));
};

const EXPIRY_DATE = process.env.JWT_EXPIRY;

const SECRET_KEY = process.env.JWT_USER_SECRET_KEY;

const userSignup = async (req: Request, res: Response) => {
  console.log(req.body, "req.body inuserSignup userHelpers");
  try {
    const { userName, email, password } = req.body;
    const { error } = signupValidator(req.body);
    if (error) {
      console.log(
        error.details[0].message,
        "error.details.message cause of invalid details in userSignup"
      );

      return res.json({
        status: "error",
        message: "Please enter valid details",
      });
    }
    console.log("no validation error in userSignup");

    let userExists = await user.findOne({ email, userName });
    if (userExists) {
      console.log("User already exists");
      return res.json({ status: "notOK", message: " user already exists " });
    }

    const saltValue = await salting();

    let hashedPassword = await bcrypt.hash(password, saltValue);
    console.log(hashedPassword, "hashedPassword");

    let newUser = new user({ userName, email, password: hashedPassword });
    await newUser.save();
    console.log("Signup successfull");

    return res.json({ status: "ok", message: " Signup successfull" });
  } catch (error: any) {
    return res.json({ status: "Error", message: `${error.message}` });
  }
};

const userLogin = async (req: Request, res: Response) => {
  console.log(req.body, "req.body in userLogin");
  try {
    const { email, password } = req.body;
    const { error } = loginValidator(req.body);
    if (error) {
      console.log(
        error.details[0].message,
        "error.details.message cause of invalid details in userLogin"
      );
      return res.json({
        status: "error",
        message: "Please enter valid details",
      });
    }
    console.log("no validation error in userLogin");

    let userExists = await user.findOne({ email });
    if (userExists) {
      try {
        if (userExists.isBlocked)
          return res.json({
            status: "notOK",
            message: "You account is Blocked",
          });
        const passwordValid = await bcrypt.compare(
          password,
          userExists.password
        );

        if (passwordValid) {
          if (userExists.deleted) {
            console.log(" user is deleted");
            return res.json({
              status: "notOK",
              message: "No such user Exists",
            });
          }
          const userToken = JWT.sign(
            {
              userName: userExists.userName,
              email: userExists.email,
              id: userExists._id,
            }, //payload
            `${SECRET_KEY}`, // secret key used to sign the JWT. It is passed as string,
            {
              expiresIn: EXPIRY_DATE,
            } //options
          );
          console.log("user login successful with userToken:", userToken);
          return res.json({
            status: "ok",
            message: "Login successfull",
            user: userToken,
            userExists,
          });
        }

        return res.json({ status: "notOK", message: "password invalid" });
      } catch (error: any) {
        console.log(
          `caught error in userLogin in inner try block : ${error.message}`
        );
        return res.json({ status: "error", message: "Internal error" });
      }
    }
    return res.json({
      status: "error",
      message: "Entered credentials did not match any user",
    });
  } catch (error: any) {
    console.log(`caught error in userLogin ${error.message}`);
    return res.json({ status: "error", message: error.message });
  }
};

const updateUserDetails = async (req: Request, res: Response) => {
  console.log(req.body, " req.body in in updateUserDetails ");
  console.log(req.params.id, " req.params in in updateUserDetails ");
  try {
    const { userName, email } = req.body;
    const userId = req.params.id;

    const { error } = updateValidator(req.body);
    if (error) {
      console.log(
        error.details[0].message,
        "error.details.message because of invalid details in updateUserDetails"
      );
      return res.json({
        status: "error",
        message: "Please enter valid details",
      });
    }
    console.log("no validation error in updateUserDetails");

    const isBlocked = await user.findOne({ _id: userId, isBlocked: true });
    if (isBlocked) {
      console.log(" user is blocked so no updations");
      return res.json({
        status: "notOK",
        message: "Couldn't perform the task as your account has been blocked",
      });
    }

    let userExists = await user.findOne({ email, userName });
    if (userExists) {
      console.log(" user with same details already exists");
      return res.json({
        status: "notOK",
        message: "User with same credentials exists",
      });
    }
    const updatedUserDetails = await user.findOneAndUpdate(
      { _id: userId },
      { $set: { email, userName } }
    );

    if (updatedUserDetails) {
      return res.json({
        status: "ok",
        message: "Successfully updated",
      });
    }

    return res.json({
      status: "ok",
      message: "Internal error, could not update user",
    });
  } catch (error: any) {
    console.log(`caught error in updateUserDetails : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

const verifyUserToken = async (req: Request, res: Response) => {
  // console.log(req.body.userToken, "req.body.userToken in verifyUseruserToken");

  try {
    const decodedToken = JWT.verify(
      req.body.userToken,
      `${SECRET_KEY}`
    ) as JwtPayload;
    console.log(decodedToken, "decodedToken in verifyUserToken");
    console.log(decodedToken.email, "decodedToken.email in verifyUserToken");

    const userExists = await user.findOne({ email: decodedToken.email });

    return res.json({
      status: "ok",
      message: "User Token Valid",
      userExists,
      userToken: true,
    });
  } catch (error: any) {
    console.log(`caught error in verifyUserToken : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

const userImage = async (req: Request, res: Response) => {
  // console.log(req?.files?.image[0], " req.files userImage");
  console.log(req.files, " req.files userImage");
  console.log(req.file, " req.file userImage");
  // console.log(req.files?.image[0][0], "req.files userImage");

  // console.log(req.file?.image[0], " req.files userImage");
  console.log(req.params.id, " req.params.id userImage");
  try {
    let Token = req.params.id;

    const { image } = req.files as { image?: Express.Multer.File[] };

    if (image && Array.isArray(image)) {
      console.log(image[0]?.fieldname); // Access the 'fieldname' property with null checks
    }

    const User = await user.findOne({ _id: Token }); //decodedToken.id
    if (User) {
      const update = await user.updateOne(
        { _id: Token }, //decodedToken.id
        {
          $set: {
            image: `${Token}`, //req.files.image[0].filename
          },
        }
      );
      const image = `http://localhost:6001/${Token}.png`; //${req.files.image[0].filename}
      console.log(image, "hereeeeeeeeeeeeeeee");

      return res
        .status(200)
        .json({ status: "ok", message: "succefully updated", image });
    } else {
      return res.json({ status: "error", message: "photo coubldint updaete" });
    }
  } catch (error: any) {
    console.log(`caught error in userImage : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

export { userSignup, userLogin, updateUserDetails, verifyUserToken, userImage };
