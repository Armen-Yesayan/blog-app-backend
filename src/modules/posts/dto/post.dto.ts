import { IsNotEmpty, IsString, IsUUID, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsNotEmpty()
    @IsString({ message: 'Description must be a string' })
    description!: string;

    @IsNotEmpty()
    @IsUUID()
    userId!: string;
}

export class UpdatePostDto {
    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;
}