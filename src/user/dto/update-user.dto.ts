import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber()
    id: number;
    
    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
