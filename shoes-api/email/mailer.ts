import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

interface Mail {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT!,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const send = (options: Mail) => {
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("E-mail envoyé : " + info.response);
    }
  });
};
