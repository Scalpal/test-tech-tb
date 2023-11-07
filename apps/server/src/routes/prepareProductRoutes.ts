import { Express } from "express";
import ProductModel from "../db/models/ProductModel";

function prepareProductRoutes ({ app }: { app: Express }) {
  app.get(
    "/api/products",
    async (req, res) => {
      const searchValue =
        typeof req.query.search === "string" ? req.query.search.toLowerCase() : "";
      
      const query = ProductModel.query().select("*").orderBy("id", "asc");

      if (searchValue.length > 0) {
        query.whereRaw("LOWER(\"name\") LIKE ? ", `%${searchValue}%`)
      }

      const products = await query;

      res.send({ result: products })
    }
  )
}

export default prepareProductRoutes;