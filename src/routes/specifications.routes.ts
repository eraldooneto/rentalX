import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";


const specificationsRoutes = Router(); 
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
    const all = specificationsRepository.list();
    
    return response.status(200).json(all);
});

export { specificationsRoutes };