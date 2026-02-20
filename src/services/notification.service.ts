import twilio from "twilio";
import nodemailer from "nodemailer";

/**
 * Create Twilio client only when needed
 */
const getTwilioClient = () => {
  const sid = process.env.TWILIO_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !token) {
    throw new Error("Twilio credentials are missing in .env file");
  }

  return twilio(sid, token);
};

export const sendSMS = async (to: string, message: string) => {
  const client = getTwilioClient();

  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE!,
    to,
  });
};

export const sendWhatsApp = async (to: string, message: string) => {
  const client = getTwilioClient();

  return client.messages.create({
    body: message,
    from: "whatsapp:+14155238886",
    to: "whatsapp:" + to,
  });
};

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials missing in .env file");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};
