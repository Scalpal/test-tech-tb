import knex from "knex";
import BaseModel from "./BaseModel";
import ProductModel from "./ProductModel";

class OrderModel extends BaseModel {
  static tableName = 'orders'

  id!: number;
  userid!: number;
  total!: number;

  static relationMappings() {
    return {
      products: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "orders.id",
          through: {
            from: "orders_products_relation.orderid",
            to: "orders_products_relation.productid"
          },
          to: "products.id"
        }
      }
    }
  }
}

export default OrderModel;