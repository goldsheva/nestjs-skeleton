import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UsePipes(ValidationPipe)
    @Post('/create')
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Get('/all')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    getAll() {
        return this.usersService.getAllUsers();
    }

    @Post('/role')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}
