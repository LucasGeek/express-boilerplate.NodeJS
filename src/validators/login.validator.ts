import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginValidator {
    @IsNotEmpty({ message: 'O email é obrigatório.' })
    @IsEmail({}, { message: 'Forneça um endereço de email válido.' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @Length(8, 20, { message: 'A senha deve ter entre 8 e 20 caracteres.' })
    password: string;
}