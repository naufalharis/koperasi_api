import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TabunganService } from './tabungan.service';
import { CreateTabunganDto } from './dto/create-tabungan.dto';
import { UpdateTabunganDto } from './dto/update-tabungan.dto';

@Controller('tabungan')
export class TabunganController {
  constructor(private readonly tabunganService: TabunganService) {}

  @Post()
  create(@Body() dto: CreateTabunganDto, @Req() req: any) {
    return this.tabunganService.create(dto, req?.user?.id);
  }

  @Get()
  findAll() {
    return this.tabunganService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tabunganService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTabunganDto,
    @Req() req: any,
  ) {
    return this.tabunganService.update(id, dto, req?.user?.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tabunganService.remove(id);
  }
}
