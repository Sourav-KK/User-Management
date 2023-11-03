import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser, { json } from "body-parser";
import cookieParser from "cookie-parser";

import Router from "./Routes/Routes";
import Connection from "./Connection/MongoConnect";
import path from "path";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

app.use("/", Router);

app.listen(PORT, async () => {
  await Connection();
  console.log(` Server listening on PORT ${PORT}`);
});

export default app;
