import dotenv from "dotenv";
import { resolve } from "path";
import knexfile from "./knexfile";

dotenv.config({ path: resolve(".env") });

const config = {
  PORT: 3001, // default
  baseUrl: "http://localhost:3001",
  db: knexfile
}

export default config;