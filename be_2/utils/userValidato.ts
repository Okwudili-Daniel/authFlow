import Joi from "joi";

let regex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

export const registerValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(regex)).required(),
  confirm: Joi.ref("passowrd"),
});
