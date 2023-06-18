import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
};

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {};

    execute({ name, description }: IRequest): void {
        const nameAlreadyExists = this.specificationsRepository.findByName(name);
        
        if (nameAlreadyExists) {
            throw new Error("Name already exists!");
        }
    
        this.specificationsRepository.create({ name, description });
    }

};

export { CreateSpecificationUseCase };