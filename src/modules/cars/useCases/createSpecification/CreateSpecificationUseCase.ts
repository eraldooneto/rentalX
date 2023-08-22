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

    async execute({ name, description }: IRequest): Promise<void> {
        const nameAlreadyExists = await this.specificationsRepository.findByName(name);
        
        if (nameAlreadyExists) {
            throw new Error("Name already exists!");
        }
    
        await this.specificationsRepository.create({ name, description });
    }

};

export { CreateSpecificationUseCase };