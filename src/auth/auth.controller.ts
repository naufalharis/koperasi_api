import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: any) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 🔒 Protected: lihat profil diri sendiri
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }

  // ✅ GET semua anggota aktif (tidak termasuk soft delete)
  @Get('anggota')
  async getAllAnggota() {
    return this.authService.findAll();
  }

  // 🔒 GET by ID (aktif saja)
  @UseGuards(JwtAuthGuard)
  @Get('anggota/:id')
  async getAnggotaById(@Param('id') id: string) {
    return this.authService.findById(id);
  }

  // 🔒 UPDATE anggota
  @UseGuards(JwtAuthGuard)
  @Put('anggota/:id')
  async updateAnggota(@Param('id') id: string, @Body() data: any) {
    return this.authService.update(id, data);
  }

  // 🔒 ❌ SOFT DELETE anggota
  @UseGuards(JwtAuthGuard)
  @Delete('anggota/:id')
  async softDeleteAnggota(@Param('id') id: string) {
    return this.authService.softDelete(id);
  }

  // OPTIONAL: GET semua anggota termasuk yang sudah soft delete
  @UseGuards(JwtAuthGuard)
  @Get('anggota-all')
  async getAllWithDeleted() {
    return this.authService.findAllWithDeleted();
  }

  // OPTIONAL: GET hanya data yang soft delete
  @UseGuards(JwtAuthGuard)
  @Get('anggota-deleted')
  async getDeletedOnly() {
    return this.authService.findDeleted();
  }

  // OPTIONAL: Restore anggota yang soft delete
  @UseGuards(JwtAuthGuard)
  @Post('anggota/restore/:id')
  async restoreAnggota(@Param('id') id: string) {
    return this.authService.restore(id);
  }
}
