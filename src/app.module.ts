import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { KategoriSimpananModule } from './simpanan/kategori-simpanan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    KategoriSimpananModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}


