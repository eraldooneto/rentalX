import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';



const categoriesRoutes = Router();
const upload = multer({
     dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle);


export { categoriesRoutes };