import { Router } from "express";

import { listSpecificationController } from "../modules/cars/useCases/listSpecification";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";


const specificationsRoutes = Router(); 

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
    return listSpecificationController.handle(request, response);
});

export { specificationsRoutes };