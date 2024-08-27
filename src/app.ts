import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", router);

app.use(globalErrorHandler);

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working successfully!");
});

export default app;
