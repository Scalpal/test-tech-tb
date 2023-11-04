import express from "express";
import config from "./config";
import routes from "./routes";
import cors from "cors";
import validateCard from "./src/middlewares/validateCard";
import { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: () => void) => {
  next();
})

app.post(routes.pay(), validateCard, (req: Request, res: Response) => {

  res.send({ message: `Merci de votre paiement de ${req.body.amount}€.` })
})

app.listen(config.PORT, () => console.log("Listening on port " + config.PORT));