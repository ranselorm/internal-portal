import express from "express";
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 7171;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
