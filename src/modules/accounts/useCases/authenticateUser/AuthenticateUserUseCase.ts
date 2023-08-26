import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    
    token: string;

};

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {};

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new Error("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password); 

        if (!passwordMatch) {
            throw new Error("Email or password incorrect!");
        }

        const token = sign({}, "6c878b8ca64854bc75c25987ba844751", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn;
        
    }

}

export { AuthenticateUserUseCase };