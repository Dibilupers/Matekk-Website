import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsInt, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @Type(() => String)
    @IsString() @Length(3, 30)
    username: string;

    @Type(() => String)
    @IsEmail()
    email: string;

    @Type(() => String)
    @IsString() @MinLength(10) @MaxLength(128)
    password: string;

    @Type(() => Number)
    @IsInt()
    programId: number;

    @Type(() => String)
    @IsString() @Length(1, 80)
    firstName: string;

    @Type(() => String)
    @IsString() @Length(1, 80)
    lastName: string;

    @IsOptional() @Type(() => String) @IsDateString()
    birthdate?: string;

    @IsOptional() @Type(() => String) @IsString() @MaxLength(40)
    gender?: string;

    @IsOptional() @Type(() => String) @IsString() @MaxLength(120)
    city?: string;
}