import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
};

@injectable()
class CreateSpecificationUseCase {
   
    constructor( @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {};

    execute({ name, description }: IRequest): void {
        const nameAlreadyExists = this.specificationsRepository.findByName(name);
        
        if (nameAlreadyExists) {
            throw new Error("Name already exists!");
        }
    
        this.specificationsRepository.create({ name, description });
    }

};

export { CreateSpecificationUseCase };