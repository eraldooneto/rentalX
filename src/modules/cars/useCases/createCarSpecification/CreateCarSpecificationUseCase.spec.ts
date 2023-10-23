import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;


describe("Create a Specification for a Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("Should not be able to add a new specification to a non existent car.", async () => {
        expect(async () => {
            const car_id = "123456";
            const specifications_id = ["654321"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });

        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to a car.", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "nodeCar",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Car Brand",
            category_id: "category"
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        });

        const specifications_id = [specification.id];

        await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

        expect(car).toHaveProperty("specifications");
        expect(car.specifications.length).toBe(1);
    });
});