import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 7071;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
