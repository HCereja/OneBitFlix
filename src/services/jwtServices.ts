import jwt from "jsonwebtoken";

const secret = "TEMP-KEY";

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  },

  verifyToken: (token: string, callback: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callback);
  },
};
