import { Request, Response } from "express";
import admin from "../Models/adminModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import JWT, { JwtPayload } from "jsonwebtoken";
dotenv.config();
import {
  loginValidator,
  signupValidator,
  updateValidator,
} from "./FormValidator";
import user from "../Models/userModel";

const salting = async () => {
  return await bcrypt.genSalt(Number(process.env.SALT));
};

const SECRET_KEY = process.env.JWT_ADMIN_SECRET_KEY;

const EXPIRY_DATE = process.env.JWT_EXPIRY;

const adminLogin = async (req: Request, res: Response) => {
  console.log(req.body, " req.body in adminLogin");
  try {
    const { email, password } = req.body;
    const { error } = loginValidator(req.body);

    if (error) {
      console.log(
        error.details[0].message,
        "error.details.message cause of invalid details in createNewUser"
      );

      return res.json({
        status: "error",
        message: "Please enter valid details",
      });
    }
    console.log("no validation error in adminLogin");

    let adminExists = await admin.findOne({ email });

    if (adminExists) {
      const passwordValid = await bcrypt.compare(
        password,
        adminExists.password
      );

      if (passwordValid) {
        const Token = JWT.sign(
          {
            email: adminExists.email,
            id: adminExists._id,
          },
          `${SECRET_KEY}`,
          {
            expiresIn: EXPIRY_DATE,
          }
        );

        console.log(" admin login successful with token:", Token);
        return res.json({
          status: "ok",
          message: "Login successfull",
          admin: Token,
        });
      }
      return res.json({ status: "notOK", message: "Invalid Password" });
    }
  } catch (error: any) {
    console.log(`error caught in catch in adminLogin ${error.message}`);
    return res.json({ status: "error", message: "Internal error" });
  }
};

const verifyAdminToken = async (req: Request, res: Response) => {
  console.log(req.body.adminToken, "req.body.adminToken in verifyAdminToken");

  try {
    const decodedToken = JWT.verify(
      req.body.adminToken,
      `${SECRET_KEY}`
    ) as JwtPayload;

    const adminExists = await admin.findOne({ email: decodedToken.email });

    return res.json({
      status: "ok",
      message: "admin Token Valid",
      adminExists,
      adminToken: true,
    });
  } catch (error: any) {
    console.log(`caught error in verifyAdminToken : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  console.log(req.body, "req.body in createNewUser");
  try {
    const { userName, email, password } = req.body;
    const { error } = signupValidator(req.body);
    if (error) {
      console.log(
        error.details[0].message,
        "error.details.message cause of invalid details in createNewUser"
      );

      return res.json({
        status: "error",
        message: "Please enter valid details",
      });
    }
    console.log("no validation error in createNewUser");

    let userExists = await user.findOne({ email, userName });
    if (userExists) {
      console.log("User already exists");
      return res.json({ status: "error", message: " user already exists " });
    }

    const saltValue = await salting();
    let hashedPassword = await bcrypt.hash(password, saltValue);
    console.log(hashedPassword, "hashedPassword");

    let newUser = new user({ userName, email, password: hashedPassword });
    await newUser.save();
    console.log("createNewUser successfull");

    return res.json({ status: "ok", message: " createNewUser successfull" });
  } catch (error: any) {
    console.log(`error caught in catch in createNewUser ${error.message}`);
    return res.json({ status: "error", message: "Internal error" });
  }
};

const editUserDetails = async (req: Request, res: Response) => {
  console.log(req.body, " req.body in in editUserDetails ");
  console.log(req.params.id, " req.params in in editUserDetails ");

  try {
    const { userName, email } = req.body;
    const userId = req.params.id;

    const { error } = updateValidator(req.body);
    if (error) {
      console.log(
        error.details[0].message,
        "error.details.message because of invalid details in editUserDetails"
      );
      return res.json({
        status: "error",
        message: "Please enter valid details",
      });
    }
    console.log("no validation error in editUserDetails");

    let userExists = await user.findOne({ email, userName });
    if (userExists) {
      console.log(" user with same details already exists in editUserDetails");
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
      console.log("userDetails successfully updated in editUserDetails");
      const token = JWT.sign(
        {
          userName: updatedUserDetails.userName,
          email: updatedUserDetails.email,
          id: updatedUserDetails._id,
        },
        `${SECRET_KEY}`,
        {
          expiresIn: "7d",
        }
      );
      console.log("user login successful with token:", token);
      return res.json({
        status: "ok",
        message: "Successfully updated",
        user: token,
      });
    }

    return res.json({
      status: "ok",
      message: "Internal error, could not update user",
    });
  } catch (error: any) {
    console.log(`caught error in editUserDetails : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  console.log(req.params.id, "req.params.id in deleteUser");
  try {
    const userId = req.params.id;

    const userDeleted = await user.findOneAndUpdate(
      { _id: userId },
      { $set: { deleted: true } }
    );
    if (userDeleted) {
      console.log(`user with id: ${userId} successfully removed `);
      return res.json({ status: "ok", message: "The user was deleted" });
    }
    console.log(`could not find and delete user with id: ${userId} `);
    return res.json({ status: "notOK", message: "The user was not deleted" });
  } catch (error: any) {
    console.log(`caught error in deleteUser : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

const Blockuser = async (req: Request, res: Response) => {
  console.log(req.params.id, "req.params.id in Blockuser ");
  try {
    const userId = req.params.id;
    const toggleUserAccess = await user.findOneAndUpdate(
      { _id: userId },
      {
        $set: { isBlocked: true },
      }
    );
    if (toggleUserAccess) {
      console.log("user is blocked in Blockuser ");

      return res.json({ status: "ok", message: "User is blocked" });
    }
  } catch (error: any) {
    console.log(`caught error in Blockuser : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

const unBlockUser = async (req: Request, res: Response) => {
  console.log(req.params.id, "req.params.id in unBlockUser ");
  try {
    const userId = req.params.id;
    const toggleUserAccess = await user.findOneAndUpdate(
      { _id: userId },
      {
        $set: { isBlocked: false },
      }
    );
    if (toggleUserAccess) {
      console.log("user is unblocked in unBlockuser ");
      return res.json({ status: "ok", message: "User is unblocked" });
    }
  } catch (error: any) {
    console.log(`caught error in unBlockUser : ${error.message} `);
    return res.json({ status: "error", message: error.message });
  }
};

const allUsers = async (req: Request, res: Response) => {
  console.log("in allUsers");
  try {
    let allActiveUsers = await user.find({ deleted: { $ne: true } });
    if (allActiveUsers) {
      // console.log(allActiveUsers, " allActiveUsers in allusers");
      return res.json({ status: "ok", allActiveUsers });
    }
    console.log(" no allActiveUsers in allusers");
    return res.json({
      status: "notOK",
      message: "Unable to fetch user details",
    });
  } catch (error: any) {
    console.log(`caught error in allUsers : ${error.message} `);
    res.status(500).json({ status: "error", message: error.message });
  }
};

const oneUser = async (req: Request, res: Response) => {
  console.log(req.params.id, "req.params.id in oneUser");
  try {
    const userId = req.params.id;
    let userFound = await user.findOne({ _id: userId });
    if (userFound) {
      // console.log(allActiveUsers, " allActiveUsers in oneUser");
      return res.json({ status: "ok", user: userFound, userId: userFound._id });
    }
    console.log(" no user found in oneUser");
    return res.json({
      status: "notOK",
      message: "Oops no such user exists",
    });
  } catch (error: any) {
    console.log(`caught error in oneUser : ${error.message} `);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export {
  adminLogin,
  verifyAdminToken,
  createNewUser,
  editUserDetails,
  deleteUser,
  Blockuser,
  unBlockUser,
  allUsers,
  oneUser,
};
