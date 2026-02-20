import { FastifyReply, FastifyRequest } from "fastify";
import { createOTP, verifyOTP } from "../services/otp.service";
import {
  sendSMS,
  sendWhatsApp,
  sendEmail,
} from "../services/notification.service";


 //  Send OTP via SMS / WhatsApp / Email

export const sendOtp = async (
  request: FastifyRequest<{
    Body: { identifier: string; type: "sms" | "whatsapp" | "email" };
  }>,
  reply: FastifyReply
) => {
  try {
    const { identifier, type } = request.body;

    if (!identifier || !type) {
      return reply.status(400).send({
        message: "Identifier and type are required",
      });
    }

    const otp = await createOTP(identifier);
    const message = ` WELCOME TO ISHWAR LAHIRE SERVICES Your OTP is ${otp}`;

    if (type === "sms") {
      await sendSMS(identifier, message);
    } else if (type === "whatsapp") {
      await sendWhatsApp(identifier, message);
    } else if (type === "email") {
      await sendEmail(identifier, "OTP Verification", message);
    } else {
      return reply.status(400).send({
        message: "Invalid type. Use sms, whatsapp, or email",
      });
    }

    return reply.status(200).send({
      message: "OTP sent successfully",
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Internal Server Error",
    });
  }
};

 // Verify OTP & Generate JWT

export const verifyOtp = async (
  request: FastifyRequest<{
    Body: { identifier: string; otp: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const { identifier, otp } = request.body;

    if (!identifier || !otp) {
      return reply.status(400).send({
        message: "Identifier and OTP are required",
      });
    }

    const isValid = await verifyOTP(identifier, otp);

    if (!isValid) {
      return reply.status(400).send({
        message: "Invalid or expired OTP",
      });
    }

    const token = await reply.jwtSign({ identifier });

    return reply.status(200).send({
      message: "OTP verified successfully",
      accessToken: token,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      message: "Internal Server Error",
    });
  }
};
