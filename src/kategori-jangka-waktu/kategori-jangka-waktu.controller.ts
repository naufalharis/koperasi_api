import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KategoriJangkaWaktuService } from './kategori-jangka-waktu.service';
import { CreateKategoriJangkaWaktuDto } from './dto/create-kategori-jangka-waktu.dto';
import { UpdateKategoriJangkaWaktuDto } from './dto/update-kategori-jangka-waktu.dto';

@Controller('kategori-jangka-waktu')
export class KategoriJangkaWaktuController {
  constructor(private readonly service: KategoriJangkaWaktuService) {}

  @Post()
  create(@Body() dto: CreateKategoriJangkaWaktuDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateKategoriJangkaWaktuDto) {
    return this.service.update(id, dto);
  }

  // SOFT DELETE
  @Patch(':id/soft')
  softDelete(@Param('id') id: string) {
    return this.service.remove(id);
  }

  // HARD DELETE
  @Delete(':id/hard')
  hardDelete(@Param('id') id: string) {
    return this.service.hardDelete(id);
  }
}
