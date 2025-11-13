import { Controller, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('anggota')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}


