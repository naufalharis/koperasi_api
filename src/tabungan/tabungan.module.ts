import { Module } from '@nestjs/common';
import { TabunganService } from './tabungan.service';
import { TabunganController } from './tabungan.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TabunganController],
  providers: [TabunganService, PrismaService],
})
export class TabunganModule {}
    