import { IsString, IsOptional } from 'class-validator';

export class UpdateUserValidator {
    @IsOptional()
    @IsString()
    name?: string;
}
