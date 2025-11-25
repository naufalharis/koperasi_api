import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PenarikanService } from './penarikan.service';
import { CreatePenarikanDto } from './dto/create-penarikan.dto';
import { UpdatePenarikanDto } from './dto/update-penarikan.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('penarikan')
@UseGuards(JwtAuthGuard)
export class PenarikanController {
  constructor(private readonly penarikanService: PenarikanService) {}

  @Post()
  create(@Body() dto: CreatePenarikanDto) {
    return this.penarikanService.create(dto);
  }

  @Get()
  findAll() {
    return this.penarikanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penarikanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePenarikanDto) {
    return this.penarikanService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.penarikanService.remove(id);
  }
}
