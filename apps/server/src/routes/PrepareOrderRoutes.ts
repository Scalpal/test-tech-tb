import { Express } from "express";
import validateCard from "../middlewares/validateCard";


function prepareOrderRoutes ({ app }: { app: Express }) {
  app.post("/pay", validateCard, (req, res) => {

    res.send({ message: `Merci de votre paiement de ${req.body.amount}€.` })
  })
}

export default prepareOrderRoutes;