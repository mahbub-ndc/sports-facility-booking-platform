import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/modules/user/user.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", router);

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working successfully!");
});

export default app;
