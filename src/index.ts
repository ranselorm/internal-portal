import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 7071;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
