import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/add')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/getall')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req()req) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @Get(){
  //   findOne(@Body('email') email: string) {
  //     return this.userService.findOne
  // }

  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: string, @Req()req) {
    return this.userService.remove(+id);
  }
}
