import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { JabatanService } from './jabatan.service';
import { CreateJabatanDto } from './dto/create-jabatan.dto';
import { UpdateJabatanDto } from './dto/update-jabatan.dto';

@Controller('jabatan')
export class JabatanController {
  constructor(private readonly jabatanService: JabatanService) {}

  @Post()
  create(@Body() data: CreateJabatanDto) {
    return this.jabatanService.create(data);
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
  update(@Param('id') id: string, @Body() data: UpdateJabatanDto) {
    return this.jabatanService.update(id, data);
  }

  // 🔥 Soft Delete (tidak benar-benar dihapus)
  @Patch(':id/soft-delete')
  softDelete(@Param('id') id: string, @Req() req: any) {
    // pastikan req.user.id ada dari JWT guard
    const userId = req.user?.id ?? 'system'; // fallback
    return this.jabatanService.softDelete(id, userId);
  }

  // 🔄 Restore data
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.jabatanService.restore(id);
  }

  // ❌ Hard Delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jabatanService.remove(id);
  }
}
