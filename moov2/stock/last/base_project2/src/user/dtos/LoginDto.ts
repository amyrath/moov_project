import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator"

export class LoginDto {
    @IsEmail()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Length(5, 50)
    readonly password: string
}