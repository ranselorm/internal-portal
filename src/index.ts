import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({ log: ["query"] });

app.use(errorMiddleware);

app.listen(PORT || 7071, () => {
  console.log(`App is running on port ${PORT}`);
});
