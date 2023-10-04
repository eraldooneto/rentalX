import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUserCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
       usersRepositoryInMemory = new UsersRepositoryInMemory();
       authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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

       const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
        
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        await expect(
          authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "1234",
          })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
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

            authenticateUserUseCase.execute({
                email: user.email,
                password: "4321"
            });

        }).rejects.toBeInstanceOf(AppError);
    });

});