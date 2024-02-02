import { Request, Response } from "express";
import { userService } from "../services/userServices";

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
};
