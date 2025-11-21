// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JabatanModule } from './jabatan/jabatan.module'; // ← Tambahkan ini

import { PrismaService } from './prisma/prisma.service';
import { KasKoperasiModule } from './kas-koperasi/kas-koperasi.module'; // <-- tambah ini

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
