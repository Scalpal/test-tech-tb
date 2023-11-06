import { Express } from "express";
import ProductModel from "../db/models/ProductModel";
import { RESULT_STATUS } from "../types/ResultStatus";

function prepareProductRoutes ({ app }: { app: Express }) {
  app.get(
    "/api/products",
    async(req, res) => {
      const products = await ProductModel.query().select("*");

      res.status(RESULT_STATUS.success).send({ result: products })
    }
  )
}

export default prepareProductRoutes;