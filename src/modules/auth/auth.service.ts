import {RegisterUserDto} from './dto/register-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from "../../common/models/user.model";
import {ApiError} from "../../common/errors/api.error";

export class AuthService {
    async register(dto: RegisterUserDto) {
        try {
            const existing = await User.findOne({where: {email: dto.email}});
            if (existing) throw new ApiError(400, 'User already exists');

            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = await User.create({
                email: dto.email,
                password: hashedPassword,
                name: dto.name,
            });

            return this.generateToken(user);
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                throw error;
            }
            if (error instanceof Error) {
                throw new ApiError(400, `Registration failed: ${error.message}`);
            }

            throw new ApiError(400, 'Registration failed: Unknown error');
        }
    }

    async login(dto: LoginUserDto) {
        try {
            const user = await User.findOne({where: {email: dto.email}});
            if (!user) {
                throw new ApiError(400, 'User not found');
            }

            const isMatch = await bcrypt.compare(dto.password, user.password!);
            if (!isMatch) {
                throw new ApiError(400, 'Invalid email or password');
            }


            return this.generateToken(user);
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ApiError(400, `Login failed: ${error.message}`);
            }

            throw new ApiError(400, 'Login failed: Unknown error');
        }
    }

    private generateToken(user: User) {
        try {
            const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET!, {
                expiresIn: '7d',
            });

            return {user, token};
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new ApiError(500, `Token generation failed: ${error.message}`);
            }

            throw new ApiError(500, 'Token generation failed: Unknown error');
        }
    }
}