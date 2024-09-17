import { Router } from "express";
import { MonoRoutes } from "./controllers/mono/routes";

export class AppRoutes{

        static get routes(): Router{
            const router = Router();
            router.use("/api/MonoMap", MonoRoutes.routes);
            return router;
        }
    
}