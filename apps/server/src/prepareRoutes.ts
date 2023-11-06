import prepareOrderRoutes from "./routes/PrepareOrderRoutes";
import prepareProductRoutes from "./routes/prepareProductRoutes";
import prepareUserRoutes from "./routes/prepareUserRoutes";
import { Express } from "express";


const prepareRoutes = (ctx: { app: Express }) => {
  prepareUserRoutes(ctx);
  prepareOrderRoutes(ctx);
  prepareProductRoutes(ctx);
}

export default prepareRoutes;