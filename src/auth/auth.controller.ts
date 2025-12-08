import { Controller, Post, Body, UseGuards, Request, Get, Param, Put, Delete, Patch } from '@nestjs/common';
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

  // 🔐 Protected route: lihat profil
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }

  // Tidak pakai guard → bebas (opsional)
  @Get('anggota')
  async getAllAnggota() {
    return this.authService.findAll();
  }

  // 🔐 Lihat anggota by ID
  @UseGuards(JwtAuthGuard)
  @Get('anggota/:id')
  async getAnggotaById(@Param('id') id: string) {
    return this.authService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('anggota/:id')
  async updateAnggota(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.authService.update(id, data);
  }

  // 🔥 Soft Delete
  @UseGuards(JwtAuthGuard)
  @Delete('anggota/:id')
  async deleteAnggota(@Param('id') id: string) {
    return this.authService.delete(id);
  }

  // 🔄 (Optional) Restore anggota
  @UseGuards(JwtAuthGuard)
  @Patch('anggota/:id/restore')
  async restoreAnggota(@Param('id') id: string) {
    return this.authService.restore(id);
  }
}
