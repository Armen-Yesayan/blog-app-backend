import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;
}