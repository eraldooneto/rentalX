import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(async () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "car",
            description: "car description",
            daily_rate: 100,
            license_plate: "XYZ-1234",
            fine_amount: 60,
            brand: "car brand",
            category_id: "category id"
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with an existent license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "car1",
                description: "description",
                daily_rate: 100,
                license_plate: "MVC-1234",
                fine_amount: 60,
                brand: "brand",
                category_id: "id"
            });

            await createCarUseCase.execute({
                name: "car1",
                description: "description",
                daily_rate: 100,
                license_plate: "MVC-1234",
                fine_amount: 60,
                brand: "brand",
                category_id: "id"
            });

        }).rejects.toBeInstanceOf(AppError);

    });

    it("Should be able to create a car with the availability set as true", async () => {
        const car = await createCarUseCase.execute({
            name: "car 2",
            description: "description",
            daily_rate: 100,
            license_plate: "MVC-0102",
            fine_amount: 60,
            brand: "brand",
            category_id: "id"
        });

        expect(car.available).toBe(true);
    });
});