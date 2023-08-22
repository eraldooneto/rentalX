import { Repository } from "typeorm";
import { Specification } from "../../entities/Specification";

import { 
    ICreateSpecificationDTO,
    ISpecificationsRepository
 } from "../ISpecificationsRepository";
 
import { PostgresDataSource } from "../../../../database/datasource-config";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>; 
   
    constructor() {
        this.repository = PostgresDataSource.getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO ): Promise<void> {
        const specification = this.repository.create({
            name, 
            description,
        });
        
        await this.repository.save(specification);
    }
    
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            where: {
                name: name
            }
        });

        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }
}; 

export { SpecificationsRepository };