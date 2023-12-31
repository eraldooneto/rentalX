import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


interface  IPayload{
    sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
        throw new AppError("Authorization token is missing.", 401);
    }

    const [, token] = authHeader.split(" ");
    
    try {
        const { sub: user_id } = verify(token, "6c878b8ca64854bc75c25987ba844751") as IPayload;
        
        const usersRepository = new UsersRepository();
        
        const user = usersRepository.findById(user_id); 
        
        if(!user) {
            throw new AppError("User does not exist!", 401);
        }

        console.log(user_id);

        request.user = {
            id: user_id
        }
        
        next();

    } catch {
        throw new AppError("Invalid token!", 401);
    }

}