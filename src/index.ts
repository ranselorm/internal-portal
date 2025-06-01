import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT || 7071, () => {
  console.log(`App is running on port ${PORT}`);
});
