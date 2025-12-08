import { Controller, Post, Body, Param, Get, Delete, Put } from "@nestjs/common";
import { PinjamanService } from "./pinjaman.service";
import { CreatePinjamanDto } from "./dto/create-pinjaman.dto";
import { ApprovePinjamanDto } from "./dto/approve-pinjaman.dto";
import { BayarAngsuranDto } from "./dto/bayar-angsuran.dto";
import { UpdatePinjamanDto } from "./dto/update-pinjaman.dto";

@Controller("pinjaman")
export class PinjamanController {
  constructor(private service: PinjamanService) {}

  // ========================
  // CREATE PINJAMAN
  // ========================
  @Post()
  create(@Body() dto: CreatePinjamanDto) {
    return this.service.createPinjaman(dto);
  }

  // ========================
  // UPDATE PINJAMAN
  // ========================
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePinjamanDto) {
    return this.service.updatePinjaman(id, dto);
  }

  // ========================
  // APPROVE PINJAMAN
  // ========================
  @Post(":id/approve")
  approve(@Param("id") id: string, @Body() dto: ApprovePinjamanDto) {
    return this.service.approvePinjaman(id, dto);
  }

  // ========================
  // CAIRKAN PINJAMAN
  // ========================
  @Post(":id/cair")
  cairkan(@Param("id") id: string) {
    return this.service.cairkanPinjaman(id);
  }

  // ========================
  // BAYAR ANGSURAN
  // ========================
  @Post("angsuran/bayar")
  bayar(@Body() dto: BayarAngsuranDto) {
    return this.service.bayarAngsuran(dto);
  }

  // ========================
  // LIST PINJAMAN (tanpa yg dihapus)
  // ========================
  @Get()
  list() {
    return this.service.listPinjaman();
  }

  // ========================
  // GET DETAIL PINJAMAN
  // ========================
  @Get(":id")
  get(@Param("id") id: string) {
    return this.service.getPinjaman(id);
  }

  // ========================
  // SOFT DELETE
  // ========================
  @Delete(":id")
  softDelete(@Param("id") id: string) {
    return this.service.softDeletePinjaman(id);
  }

  // ========================
  // TEMPAT SAMPAH
  // ========================
  @Get("/trash/bin")
  trash() {
    return this.service.trashBin();
  }

  // ========================
  // RESTORE DARI SAMPAH
  // ========================
  @Post(":id/restore")
  restore(@Param("id") id: string) {
    return this.service.restorePinjaman(id);
  }

  // ========================
  // HARD DELETE PERMANEN
  // ========================
  @Delete(":id/hard")
  hardDelete(@Param("id") id: string) {
    return this.service.hardDeletePinjaman(id);
  }
}
