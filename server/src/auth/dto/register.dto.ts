import { IsEmail, IsInt, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString() @Length(3, 30)
    username: string;

    @IsEmail()
    email: string;

    @IsString() @MinLength(10) @MaxLength(128)
    password: string;

    @IsInt()
    programId: number;
}