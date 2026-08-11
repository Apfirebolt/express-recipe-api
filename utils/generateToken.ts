import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (id: string | number): string => {
  const secret: Secret | undefined = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const options: SignOptions = {
    expiresIn: "30d",
  };

  return jwt.sign({ id }, secret, options);
};

export default generateToken;