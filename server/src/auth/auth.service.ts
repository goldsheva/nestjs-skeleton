import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
            private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this._validateUser(userDto);
        return this._generateToken(user);
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);

        if(candidate){
            throw new HttpException('The user already registered', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({... userDto, password: hashPassword})
        
        return this._generateToken(user)
    }

    private async _generateToken(user: User) {
        const payload = {id: user.id, email: user.email, roles: user.roles}

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async _validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)

        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Invalid email or password'})
    }
}
