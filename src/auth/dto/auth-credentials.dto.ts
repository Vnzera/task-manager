import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

// class validator package for decorators and NestJS validation pipe work together here

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'The password is too weak' })
    password: string;
}