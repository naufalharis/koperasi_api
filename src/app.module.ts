import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PinjamanModule } from './pinjaman/pinjaman.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PinjamanModule, // <--- WAJIB ADA
  ],
  providers: [PrismaService],
})
export class AppModule {}
