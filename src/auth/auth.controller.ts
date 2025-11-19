import { Controller, Post, Body, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';
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

  // 🔐 Protected route: melihat profil
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get('anggota')
  async getAllAnggota() {
    return this.authService.findAll();
  }

  // 🔐 Protected route: lihat anggota by ID
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

  // ❌ DELETE ANGGOTA
  @UseGuards(JwtAuthGuard)
  @Delete('anggota/:id')
  async deleteAnggota(@Param('id') id: string) {
    return this.authService.delete(id);
  }
}