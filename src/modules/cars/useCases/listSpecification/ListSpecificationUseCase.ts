import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationUseCase {
    constructor(@inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {};

    execute(): Specification[] {
        const specifications = this.specificationsRepository.list();
       
        return specifications;
    }
};

export { ListSpecificationUseCase };