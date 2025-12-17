// src/kas-koperasi/kas-koperasi.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { KasKoperasiService } from './kas-koperasi.service';
import { CreateKasDto } from './dto/create-kas.dto';
import { UpdateKasDto } from './dto/update-kas.dto';
import { KasQueryDto } from './dto/kas-query.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('kas')
export class KasKoperasiController {
  constructor(private readonly kasService: KasKoperasiService) {}

  // protect create with guard so created_by can be set automatically
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateKasDto, @GetUser('id') userId: string) {
    return this.kasService.create(dto, userId);
  }

  // listing can be public
  @Get()
  findAll(@Query() query: KasQueryDto) {
    return this.kasService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateKasDto, @GetUser('id') userId: string) {
    return this.kasService.update(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.kasService.remove(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/restore')
  restore(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.kasService.restore(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/force')
  forceDelete(@Param('id') id: string) {
    return this.kasService.forceDelete(id);
  }
}
