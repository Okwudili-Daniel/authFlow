import { Document } from "mongoose";
import { HTTP } from "./enum";

export interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}

export interface iUser {
  email: string;
  password: string;
  token: string;
  status: string;
  schoolCode: string;
  verify: boolean;
}

export interface iUserData extends iUser, Document {}
