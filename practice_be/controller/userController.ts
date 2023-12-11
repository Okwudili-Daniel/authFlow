import { Request, Response } from "express";
import { FOOD, HTTP } from "../utils/enum";
import UserModel from "../model/userModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail, sendResetPasswordEmail } from "../utils/email";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(3).toString("hex");
    const schoolCode = crypto.randomBytes(4).toString("hex");

    const user = await UserModel.create({
      email,
      password: hashPassword,
      schoolCode: schoolCode,
      token: token,
    });

    sendEmail(user);
    console.log(sendEmail(user));
    return res.status(HTTP.OK).json({
      message: "User created",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Invalid",
    });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(3).toString("hex");
    const schoolCode = crypto.randomBytes(4).toString("hex");

    const user = await UserModel.create({
      email,
      password: hashPassword,
      schoolCode: schoolCode,
      token: token,
      status: FOOD.ADMIN,
    });

    sendEmail(user);
    console.log(sendEmail(user));
    return res.status(HTTP.OK).json({
      message: "User created",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Invalid",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const getUser = await UserModel.findOne({ token });

    if (getUser) {
      await UserModel.findByIdAndUpdate(
        getUser._id,
        { token: "", verify: true },
        { new: true }
      );

      return res.status(HTTP.OK).json({
        message: "User is verified and updated",
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Wrong token",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Invalid",
    });
  }
};

export const signInUser = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;
    const checked = await UserModel.findOne({ email });

    if (checked) {
      const pass = await bcrypt.compare(password, checked.password);

      if (pass) {
        if (checked.verify && checked.token === "") {
          const token = jwt.sign({ id: checked._id }, "justasecret", {
            expiresIn: "2d",
          });
          req.session.isAuth = true;
          req.session.data = checked;

          return res.status(HTTP.OK).json({
            message: "User signed in",
            data: token,
          });
        } else {
          return res.status(HTTP.BAD_REQUEST).json({
            message: "Pls go and verify your account",
          });
        }
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Incorrect password",
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Incorrect email address",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Invalid",
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find();
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Users found",
      data: user,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "No user found",
    });
  }
};

export const getAllUsers = async (req: any, res: Response) => {
  try {
    const user = await UserModel.find();
    const data = req.data;
    console.log(data);

    if (data.status === "admin") {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Users found",
        data: user,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "you are not allowed to access this page",
      });
    }
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "No user found",
    });
  }
};

export const changeUserPassword = async (req: any, res: Response) => {
  try {
    const { password } = req.body;
    const { userID } = req.params;

    const getUser = await UserModel.findById(userID);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (getUser) {
      if (getUser.verify && getUser.token === "") {
        if (getUser.password !== password) {
          await UserModel.findByIdAndUpdate(
            getUser._id,
            {
              password: hashPassword,
              token: "",
            },
            { new: true }
          );

          return res.status(HTTP.OK).json({
            message: "Password updated successfully",
          });
        } else {
          return res.status(HTTP.BAD_REQUEST).json({
            message: "Thiswas your old password",
          });
        }
      } else {
        return res.status(HTTP.BAD_REQUEST).json({
          message: "Your Account hasn't been verified",
        });
      }
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "User not found",
      });
    }
    return res.status(HTTP.BAD_REQUEST).json({
      message: "you are not allowed to access this page",
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "No user found",
    });
  }
};

export const logOutUser = async (req: any, res: Response) => {
  try {
    req.session.destroy();

    return res.status(HTTP.OK).json({
      message: "User has been logged out",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating user: ",
    });
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const getUser = await UserModel.findOne({ email });
    if (getUser) {
      const token = crypto.randomBytes(16).toString("hex");

      const checkUser = await UserModel.findByIdAndUpdate(
        getUser._id,
        {
          token,
        },
        { new: true }
      );

      sendResetPasswordEmail(checkUser);

      return res.status(HTTP.OK).json({
        message: "An email has been sent to confirm your request",
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "No user found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating user: ",
    });
  }
};
