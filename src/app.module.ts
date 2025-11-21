import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JabatanModule } from './jabatan/jabatan.module'; // ← Tambahkan ini

import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    JabatanModule, // ← Tambahkan di sini
  ],
  providers: [PrismaService],
})
export class AppModule {}
