import { connect } from "mongoose";

import env from "dotenv";
env.config();

export const dbConfig = async () => {
  try {
    await connect(process.env.DATABASE_URL!)
      .then(() => {
        console.log("Connected to database");
      })
      .catch(() => console.error());
  } catch (error) {
    return error;
  }
};
