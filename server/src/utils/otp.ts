export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const otpExpiry = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  return now;
};
