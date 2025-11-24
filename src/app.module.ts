import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JabatanModule } from './jabatan/jabatan.module';
import { KategoriJangkaWaktuModule } from './kategori-jangka-waktu/kategori-jangka-waktu.module';
import { KategoriSimpananModule } from './simpanan/kategori-simpanan.module'; // ← Tambahkan ini
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    JabatanModule,
    KategoriJangkaWaktuModule,
    KategoriSimpananModule
  ],
  providers: [PrismaService],
})
export class AppModule {}
