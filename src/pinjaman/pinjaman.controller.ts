import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { PinjamanService } from "./pinjaman.service";
import { CreatePinjamanDto } from "./dto/create-pinjaman.dto";
import { ApprovePinjamanDto } from "./dto/approve-pinjaman.dto";
import { BayarAngsuranDto } from "./dto/bayar-angsuran.dto";

@Controller("pinjaman")
export class PinjamanController {
  constructor(private service: PinjamanService) {}

  @Post()
  create(@Body() dto: CreatePinjamanDto) {
    return this.service.createPinjaman(dto);
  }

  @Post(":id/approve")
  approve(@Param("id") id: string, @Body() dto: ApprovePinjamanDto) {
    return this.service.approvePinjaman(id, dto);
  }

  @Post(":id/cair")
/*************  ✨ Windsurf Command ⭐  *************/
/*******  beb1f2f7-3277-4866-a90e-32066983596d  *******/
  cairkan(@Param("id") id: string) {
    return this.service.cairkanPinjaman(id);
  }

  @Post("angsuran/bayar")
  bayar(@Body() dto: BayarAngsuranDto) {
    return this.service.bayarAngsuran(dto);
  }

  @Get()
  list() {
    return this.service.listPinjaman();
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.service.getPinjaman(id);
  }
}
