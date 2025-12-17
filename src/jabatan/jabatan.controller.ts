import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
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

  // support query param ?includeDeleted=true
  @Get()
  findAll(@Query('includeDeleted') includeDeleted?: string) {
    const inc = includeDeleted === 'true';
    return this.jabatanService.findAll(inc);
  }

  // optional: allow viewing deleted when ?includeDeleted=true
  @Get(':id')
  findOne(@Param('id') id: string, @Query('includeDeleted') includeDeleted?: string) {
    const inc = includeDeleted === 'true';
    return this.jabatanService.findOne(id, inc);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateJabatanDto) {
    return this.jabatanService.update(id, data);
  }

  // Soft Delete (PATCH)
  @Patch(':id/soft-delete')
  softDelete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id ?? 'system';
    return this.jabatanService.softDelete(id, userId);
  }

  // Restore (PATCH)
  @Patch(':id/restore')
  restore(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id ?? 'system';
    return this.jabatanService.restore(id, userId);
  }

  // Hard Delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jabatanService.remove(id);
  }
}
