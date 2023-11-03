import Joi from "joi";

const signupValidator = (data: any) => {
  const Schema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
        )
      )
      .max(15)
      .required(),
  });
  return Schema.validate(data);
};

const loginValidator = (data: any) => {
  const Schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
        )
      )
      .max(15)
      .required(),
  });
  return Schema.validate(data);
};

const updateValidator = (data: any) => {
  const Schema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(10).required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
      .required(),
  });
  return Schema.validate(data);
};

export { signupValidator, loginValidator, updateValidator };

// const nameValidator = (userName: string) => {
//   return Joi.string().alphanum().min(3).max(10).required().validate(userName);
// };

// const emaiValidator = (email: string) => {
//   return Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net","in"] } })
//     .required()
//     .validate(email);
// };

// const passwordValidator = (password: string) => {
//   return Joi.string()
//     .alphanum()
//     .min(3)
//     .max(15)
//     .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//     .required()
//     .validate(password);
// };
