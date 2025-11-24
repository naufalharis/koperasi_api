import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JabatanModule } from './jabatan/jabatan.module'; // ← Tambahkan ini

import { PrismaService } from './prisma/prisma.service';
import { PinjamanModule } from './pinjaman/pinjaman.module';
import { KategoriJangkaWaktuModule } from './kategori-jangka-waktu/kategori-jangka-waktu.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
