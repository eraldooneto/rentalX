import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";
import { ListSpecificationController } from "./ListSpecificationController";


const specificationsRepository = null;

const listSpecificationUseCase = new ListSpecificationUseCase(specificationsRepository);

const listSpecificationController = new ListSpecificationController(listSpecificationUseCase);

export { listSpecificationController };