import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    // throw Error("User already exists");
    next(
      new BadRequestException(
        "User already exist",
        ErrorCode.USER_ALREADY_EXIST
      )
    );
    return;
  }

  user = await prismaClient.user.create({
    data: {
      email,
      name,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    next(
      new BadRequestException(
        "User does not exist",
        ErrorCode.INCORRECT_PASSWORD_USERNAME
      )
    );
    return;
    // throw new Error("Wrong email or password");
  }

  if (!compareSync(password, user.password)) {
    next(
      new BadRequestException(
        "Wrong email or password",
        ErrorCode.INCORRECT_PASSWORD_USERNAME
      )
    );

    return;

    /*   res.json({
      message: "Wrong email or password",
      errorCode: ErrorCode.INCORRECT_PASSWORD_USERNAME,
      errors: null,
    });
    return; */
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};

// next(
//       new BadRequestException(
//         "Wrong email or password",
//         ErrorCode.INCORRECT_PASSWORD_USERNAME
//       )
//     );
