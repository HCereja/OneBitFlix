import { Request, Response } from "express";
import { userService } from "../services/userServices";
import { jwtService } from "../services/jwtServices";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, birth, phone } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (user) {
        throw new Error("user already exists");
      }

      const newUser = await userService.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birth: birth,
        phone: phone,
        role: "user",
      });

      return res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ message: "user not found/incorrect password" });
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (!isSame) {
          return res
            .status(401)
            .json({ message: "user not found/incorrect password" });
        }

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };

        const token = jwtService.signToken(payload, "1d");

        return res.json({ authenticated: true, token: token });
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
