import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
         const car = await carsRepositoryInMemory.create({
            name: "Compass",
            description: "Luxury SUV",
            daily_rate: 500,
            license_plate: "ZTO-6523",
            fine_amount: 180,
            brand: "Jeep",
            category_id: "category id"
        });

        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by brand.", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Renegade",
            description: "Luxury SUV",
            daily_rate: 500,
            license_plate: "ZTO-6523",
            fine_amount: 180,
            brand: "Jeep",
            category_id: "category id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Jeep",
        });
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by its name.", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Renegade",
            description: "Luxury SUV",
            daily_rate: 500,
            license_plate: "ZTO-6523",
            fine_amount: 180,
            brand: "Jeep",
            category_id: "category id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Renegade",
        });
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by its category.", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Renegade",
            description: "Luxury SUV",
            daily_rate: 500,
            license_plate: "ZTO-6523",
            fine_amount: 180,
            brand: "Jeep",
            category_id: "12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });
        
        expect(cars).toEqual([car]);
    });

});