import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { KategoriJangkaWaktuModule } from './kategori-jangka-waktu/kategori-jangka-waktu.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    KategoriJangkaWaktuModule, // <-- tambahkan ini
  ],
  providers: [PrismaService],
})
export class AppModule {}
