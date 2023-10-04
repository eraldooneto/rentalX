import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";



class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    
    async create({ 
        name,
        description,
        brand,
        category_id,
        daily_rate,
        fine_amount,
        license_plate
    }: ICreateCarDTO): Promise<void> {
        const car = new Car();
        
        Object.assign(car, {
            name,
            description,
            brand,
            category_id,
            daily_rate,
            fine_amount,
            license_plate
        });

        this.cars.push(car);

    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate)
    }
}

export { CarsRepositoryInMemory };