"use strict";
// import {nodemailer} from "nodemailer"
// const GOOGLE_ID =
//   "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
// const GOOGLE_SECRET = "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";
// const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
// const GOOGLE_REFRESH =
//   "1//04niB3092spRHCgYIARAAGAQSNwF-L9IrqnK4LW9U4514wO3gQLRNlNgHUDQRFDx__vNUd9fUWcSjuPhFW1axNBa8waSwOqRkr-g";
// const oAuth = new google.auth.OAuth2(
//   GOOGLE_ID,
//   GOOGLE_SECRET,
//   GOOGLE_REDIRECT_URL
// );
// oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });
// export const sendMail = async () => {
//   try {
//     const accessToken: any = (await oAuth.getAccessToken()).token;
//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "codelabbest@gmail.com",
//         clientId: GOOGLE_ID,
//         clientSecret: GOOGLE_SECRET,
//         refreshToken: GOOGLE_REFRESH,
//         accessToken,
//       },
//     });
//     const mailerOption = {
//       from: "Welcome back <codelabbest@gmail.com>",
//       to: "shecodesaj@gmail.com",
//       subject: "Account Verification",
//       html: <p>test</p>,
//       text: "We are here",
//     };
//     await transport.sendMail(mailerOption);
//   } catch (error) {
//     return error;
//   }
// };
