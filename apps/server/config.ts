import dotenv from "dotenv";
import { resolve } from "path";
import knexfile from "./knexfile";

dotenv.config({ path: resolve(".env") });

const config = {
  PORT: 3001, // default
  db: knexfile,
  security: {
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET as string,
      expiresIn: "2 days",
    },
    password: {
      saltlen: 512,
      keylen: 512,
      iterations: 100000,
      digest: "sha512",
      pepper: process.env.SECURITY_PASSWORD_PEPPER,
    }
  }
}

export default config;