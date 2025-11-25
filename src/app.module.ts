import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JabatanModule } from './jabatan/jabatan.module';
import { KasKoperasiModule } from './kas-koperasi/kas-koperasi.module';
import { KategoriJangkaWaktuModule } from './kategori-jangka-waktu/kategori-jangka-waktu.module';
import { PinjamanModule } from './pinjaman/pinjaman.module';
import { KategoriSimpananModule } from './simpanan/kategori-simpanan.module';
import { TabunganModule } from './tabungan/tabungan.module';
import { AngsuranModule } from './angsuran/angsuran.module';
import { PenarikanModule } from './penarikan/penarikan.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    JabatanModule,
    KasKoperasiModule,
    KategoriJangkaWaktuModule,
    PinjamanModule,
    KategoriSimpananModule,
    TabunganModule,
    AngsuranModule,
    PenarikanModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
