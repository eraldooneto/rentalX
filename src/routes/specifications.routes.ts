import { Router } from "express";

import { ListSpecificationController } from "../modules/cars/useCases/listSpecification/ListSpecificationController";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router(); 

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

//specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", ensureAuthenticated, createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };