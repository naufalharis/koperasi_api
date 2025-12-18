// src/kategori-simpanan/kategori-simpanan.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, Req } from '@nestjs/common';
import { KategoriSimpananService } from './kategori-simpanan.service';
import { CreateKategoriSimpananDto } from './dto/create-kategori-simpanan.dto';
import { UpdateKategoriSimpananDto } from './dto/update-kategori-simpanan.dto';

@Controller('kategori-simpanan')
export class KategoriSimpananController {
  constructor(private readonly service: KategoriSimpananService) {}

  @Get()
  findAll(@Query('includeDeleted') includeDeleted?: string) {
    const inc = includeDeleted === 'true';
    return this.service.findAll(inc);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('includeDeleted') includeDeleted?: string) {
    const inc = includeDeleted === 'true';
    return this.service.findOne(id, inc);
  }

  @Post()
  create(@Body() dto: CreateKategoriSimpananDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateKategoriSimpananDto) {
    return this.service.update(id, dto);
  }

  // SOFT DELETE
  // gunakan PATCH supaya lebih semantik dan tidak tergantung body pada DELETE
  @Patch(':id/soft-delete')
  softDelete(@Param('id') id: string, @Body('deleted_by') deleted_by?: string, @Req() req?: any) {
    const user = deleted_by ?? req?.user?.id ?? 'system';
    return this.service.softDelete(id, user);
  }

  // RESTORE
  @Patch(':id/restore')
  restore(@Param('id') id: string, @Req() req?: any) {
    const user = req?.user?.id ?? 'system';
    return this.service.restore(id, user);
  }

  // HARD DELETE
  @Delete(':id')
  forceDelete(@Param('id') id: string) {
    return this.service.forceDelete(id);
  }
}
