import { Module } from '@nestjs/common';
import { PenarikanService } from './penarikan.service';
import { PenarikanController } from './penarikan.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PenarikanController],
  providers: [PenarikanService, PrismaService],
})
export class PenarikanModule {}
