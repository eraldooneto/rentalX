import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUsersUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUserCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
       usersRepositoryInMemory = new UsersRepositoryInMemory();
       authenticateUsersUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
       createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory)
    });
    
    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "13548962",
            email: "email@email.com",
            password: "1234",
            name: "User Test",
        }

        await createUserUserCase.execute(user);

       const result = await authenticateUsersUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
        
    });

    it("Should not be able to authenticate an unregistered user", async () => {
        expect(async () => {
            await authenticateUsersUseCase.execute({
                email: "false@email.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate an user with incorrect password", async () => {
        expect(async() => {
            const user: ICreateUserDTO = {
                driver_license: "123456",
                email: "user@email.com",
                password: "1234",
                name: "User Test Error",
            }

            await createUserUserCase.execute(user)

            authenticateUsersUseCase.execute({
                email: user.email,
                password: "4321"
            });

        }).rejects.toBeInstanceOf(AppError);
    });

});