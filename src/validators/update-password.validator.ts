import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordValidator {
    @IsNotEmpty()
    @Length(8, 20)
    newPassword: string;
}
