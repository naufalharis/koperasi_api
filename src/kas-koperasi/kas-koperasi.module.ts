// src/kas-koperasi/kas-koperasi.module.ts
import { Module } from '@nestjs/common';
import { KasKoperasiService } from './kas-koperasi.service';
import { KasKoperasiController } from './kas-koperasi.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // jika guard butuh provider dari module auth

@Module({
  controllers: [KasKoperasiController],
  providers: [KasKoperasiService, PrismaService],
  imports: [AuthModule], // impor AuthModule bila JwtAuthGuard membutuhkan provider (opsional)
})
export class KasKoperasiModule {}
