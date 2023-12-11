import { Request, Response } from "express";
import { HTTP } from "../utils/enum";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import crypto from "crypto";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(3).toString("hex");
    const schoolCode = crypto.randomBytes(4).toString("hex");

    const user = await userModel.create({
      email,
      password: hashedPassword,
      schoolCode: schoolCode,
      token,
    });
  } catch (error) {
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Invalid" + error.message,
    });
  }
};
