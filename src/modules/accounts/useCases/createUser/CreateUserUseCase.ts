import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    
    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        
        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError("User already exists!");
        };
        
        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });
    }
}

export { CreateUserUseCase };
