import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserValidator {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 20)
    password: string;
}
