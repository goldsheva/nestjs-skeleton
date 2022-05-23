import {IsString, Length, IsEmail} from 'class-validator';

export class CreateUserDto {
    @IsString({message: 'Should be a string'})
    @IsEmail({}, {message: 'Incorrect the email'})
    readonly email: string;

    @IsString({message: 'Should be a string'})
    @Length(4, 16, {message: 'The password can not be less than 4 and more than 16 chars'})
    readonly password: string;
}