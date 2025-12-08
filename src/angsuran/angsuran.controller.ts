import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AngsuranService } from './angsuran.service';
import { CreateAngsuranDto } from './dto/create-angsuran.dto';
import { UpdateAngsuranDto } from './dto/update-angsuran.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('angsuran')
export class AngsuranController {
  constructor(private readonly angsuranService: AngsuranService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateAngsuranDto, @Request() req) {
    const userId = req.user.id; // dari JWT payload
    return this.angsuranService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.angsuranService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.angsuranService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAngsuranDto) {
    return this.angsuranService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.angsuranService.remove(id);
  }
}
