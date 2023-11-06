import BaseModel from "./BaseModel";


class ProductModel extends BaseModel {
  static tableName = 'products'

  id!: number;
  name!: string;
  price!: number;
  stock!: number;
}

export default ProductModel;