import { Express } from "express";
import validateCard from "../middlewares/validateCard";
import OrderProductRelationModel from "../db/models/OrderProductRelationModel";
import OrderModel from "../db/models/OrderModel";
import { Order } from "../types/Orders";
import ProductModel from "../db/models/ProductModel";
import auth from "../middlewares/auth";
import jsonwebtoken from "jsonwebtoken"
import config from "../../config";
import getLoggedUserIdByJwt from "../services/getLoggedUserIdByJwt";


function prepareOrderRoutes({ app }: { app: Express }) {
  app.get(
    "/api/order",
    auth,
    async (req, res) => {
      // Get logged user id
      const userId = getLoggedUserIdByJwt(req);
      if (userId === null) {
        res.status(500).send({ error: "Invalid token" })

        return;
      }

      const orders = await OrderModel.query().withGraphFetched("products").where('userid', userId);

      res.send({ orders: orders });
    }
  )
  app.post(
    "/api/order",
    auth,
    validateCard,
    async (req, res) => {
      const cart = req.body.cart;

      // Get logged user id
      const userId = getLoggedUserIdByJwt(req);
      if (userId === null) {
        res.status(500).send({ error: "Invalid token" })

        return;
      }

      if (cart.length === 0) {
        res.send({ error: "Empty cart" })

        return;
      }

      const totalPrice = cart.reduce((acc: number, { price, quantity }: any) => acc + (price * quantity), 0)

      // Create the order
      const order: Order = await OrderModel.query()
        .insert({
          userid: userId,
          total: totalPrice
        })

      // Create the relations between the products and the order 
      await Promise.all(cart.map(async (product: any) => {
        await OrderProductRelationModel.query().insert({
          orderid: order.id,
          productid: product.id,
          quantity: product.quantity
        }).returning("*")
      }));

      // Update product stocks
      const cartProductsIds = cart.reduce((acc: number[], { id }: any) => [...acc, id], []);
      const concernedProducts = await ProductModel.query().select("*").whereIn("id", cartProductsIds);

      await Promise.all(cart.map(async (product: any) => {
        const productCurrentStock = concernedProducts.find((item: any) => item.id === product.id)?.stock as number;
        const newStock = productCurrentStock - product.quantity;

        if (newStock <= 0) {
          res.send({ error: `No stock available for product : ${product.id} - ${product.name}` });
        }

        await ProductModel.query()
          .update({
            stock: newStock
          })
          .where("id", product.id)
      }))

      const newOrder = await OrderModel.query()
        .withGraphFetched("products")
        .where("id", order.id);
      
      res.send({
        message: `Thanks for your order of ${totalPrice}€.`,
        order: newOrder
      })
    }
  )

}

export default prepareOrderRoutes;