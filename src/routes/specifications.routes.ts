import { Router } from "express";

import { ListSpecificationController } from "../modules/cars/useCases/listSpecification/ListSpecificationController";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router(); 

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();


specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };