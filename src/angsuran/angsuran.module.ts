import { Module } from '@nestjs/common';
import { AngsuranService } from './angsuran.service';
import { AngsuranController } from './angsuran.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AngsuranController],
  providers: [AngsuranService, PrismaService],
})
export class AngsuranModule {}
