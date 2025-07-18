import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { validateOrReject } from 'class-validator';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = Object.assign(new RegisterUserDto(), req.body);
            await validateOrReject(dto);
            const result = await authService.register(dto);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = Object.assign(new LoginUserDto(), req.body);
            await validateOrReject(dto);
            const result = await authService.login(dto);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}