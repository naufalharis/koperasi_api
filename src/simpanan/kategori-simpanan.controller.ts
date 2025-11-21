import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { KategoriSimpananService } from './kategori-simpanan.service';
import { CreateKategoriSimpananDto } from './dto/create-kategori-simpanan.dto';
import { UpdateKategoriSimpananDto } from './dto/update-kategori-simpanan.dto';

@Controller('kategori-simpanan')
export class KategoriSimpananController {
  constructor(private readonly service: KategoriSimpananService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateKategoriSimpananDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateKategoriSimpananDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
