import { resolve } from "path"
import { config } from "dotenv"

config();

const knexfile = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
  }
};

export default knexfile;


