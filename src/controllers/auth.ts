import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.send("Hit login routes");
};

export const signup = (req: Request, res: Response) => {
  res.send("Hit signup routes");
};
