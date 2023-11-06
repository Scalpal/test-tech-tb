import hashPassword from "../hashpassword";
import BaseModel from "./BaseModel";


class UserModel extends BaseModel {
  static tableName = "users"

  id!: number;
  lastname!: string;
  firstname!: string;
  email!: string;
  passwordhash!: string;
  passwordsalt!: string;

  checkPassword = async (password: string) => {
    const [passwordHash] = await hashPassword(password, this.passwordsalt);

    return passwordHash === this.passwordhash;
  };
}

export default UserModel;