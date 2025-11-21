import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JabatanService } from './jabatan.service';
import { CreateJabatanDto } from './dto/create-jabatan.dto';
import { UpdateJabatanDto } from './dto/update-jabatan.dto';

@Controller('jabatan')
export class JabatanController {
  constructor(private readonly jabatanService: JabatanService) {}

  @Post()
  create(@Body() dto: CreateJabatanDto) {
    return this.jabatanService.create(dto);
  }

  @Get()
  findAll() {
    return this.jabatanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jabatanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJabatanDto) {
    return this.jabatanService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jabatanService.remove(id);
  }
}
