import { Express } from "express";
import ProductModel from "../db/models/ProductModel";

function prepareProductRoutes ({ app }: { app: Express }) {
  app.get(
    "/products",
    async(req, res) => {
      const products = await ProductModel.query().select("*");

      res.send({ result: products })
    }
  )
}

export default prepareProductRoutes;