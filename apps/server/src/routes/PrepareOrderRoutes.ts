import { Express } from "express";
import validateCard from "../middlewares/validateCard";
import OrderProductRelationModel from "../db/models/OrderProductRelationModel";
import OrderModel from "../db/models/OrderModel";
import { Order } from "../types/Orders";
import ProductModel from "../db/models/ProductModel";
import UserModel from "../db/models/UserModel";
import { RESULT_STATUS } from "../types/ResultStatus";


function prepareOrderRoutes ({ app }: { app: Express }) {
  app.post(
    "/api/order",
    validateCard,
    async (req, res) => {
      const cart = req.body.cart;

      if (cart.length === 0) {
        res.send({ error: "Empty cart" })
      }

      const totalPrice = cart.reduce((acc: number, { price, quantity }: any) => acc + (price * quantity), 0)

      // Create the order
      const order: Order = await OrderModel.query()
        .insert({
          userid: 1,
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
        status: RESULT_STATUS.success,
        message: `Thanks for your order of ${totalPrice}€.`,
        order: newOrder
      })
    }
  )

}

export default prepareOrderRoutes;