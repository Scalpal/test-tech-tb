import express, { Express } from "express";
import config from "./config";
import { Request, Response } from "express";
import prepareRoutes from "./src/prepareRoutes";
import BaseModel from "./src/db/models/BaseModel";
import knex from "knex";
import cors from "cors";

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

const app: Express = express();
app.use(express.json());
app.use(cors(corsOptions));

const db = knex(config.db)
BaseModel.knex(db)

app.use((req: Request, res: Response, next: () => void) => {
  next();
})

prepareRoutes({ app })

app.listen(config.PORT, () => console.log("Listening on port " + config.PORT));