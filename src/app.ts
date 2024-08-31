import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/", router);

app.use(globalErrorHandler);

app.use(notFound);

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working successfully!");
});

export default app;
