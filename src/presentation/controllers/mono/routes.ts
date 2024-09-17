import { Router } from "express"
import { MonoCasesController } from "./controller";

export class MonoRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new MonoCasesController();

        router.get("/", controller.getMonoCase);
        router.get("/:id", controller.getMonoCaseById);
        router.post("/", controller.createMonoCase);
        router.put("/:id", controller.updateMonoCase);
        router.put("/:id", controller.deleteMonoCase);


        return router;
    }
}