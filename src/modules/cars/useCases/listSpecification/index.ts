import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";
import { ListSpecificationController } from "./ListSpecificationController";


const specificationsRepository = SpecificationsRepository.getInstance();

const listSpecificationUseCase = new ListSpecificationUseCase(specificationsRepository);

const listSpecificationController = new ListSpecificationController(listSpecificationUseCase);

export { listSpecificationController };