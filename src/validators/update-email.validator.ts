import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmailValidator {
    @IsNotEmpty()
    @IsEmail()
    newEmail: string;
}
