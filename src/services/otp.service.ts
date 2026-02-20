import { redisClient } from '../config/redis';
import { generateOTP } from '../utils/otp';

export const createOTP = async (identifier: string) => {
  const otp = generateOTP();
  await redisClient.set(`otp:${identifier}`, otp, 'EX', 300);
  return otp;
};

export const verifyOTP = async (identifier: string, otp: string) => {
  const stored = await redisClient.get(`otp:${identifier}`);
  return stored === otp;
};
