import { Module } from "@nestjs/common";
import { PinjamanController } from "./pinjaman.controller";
import { PinjamanService } from "./pinjaman.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [PinjamanController],
  providers: [PinjamanService, PrismaService],
  exports: [PinjamanService],
})
export class PinjamanModule {}
