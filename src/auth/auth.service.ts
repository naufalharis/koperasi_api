import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.anggota.findFirst({
      where: { email, deleted_at: null },
    });
    if (!user) throw new UnauthorizedException('User tidak ditemukan');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password salah');

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, nama: user.nama };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: {
    nama: string;
    email: string;
    password: string;
    id_jabatan: string;
    alamat?: string;
    no_hp?: string;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return await this.prisma.anggota.create({
      data: { ...data, password: hashed },
    });
  }

  // 🔥 Hanya ambil yang belum dihapus
  async findAll() {
    return this.prisma.anggota.findMany({
      where: { deleted_at: null },
      include: { jabatan: true },
    });
  }

  // 🔥 Juga hanya ambil yang belum dihapus
  async findById(id: string) {
    return this.prisma.anggota.findFirst({
      where: { id, deleted_at: null },
      include: { jabatan: true },
    });
  }

  async update(id: string, data: any) {
    let updateData = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.anggota.update({
      where: { id },
      data: updateData,
    });
  }

  // 🔥 SOFT DELETE → hanya set deleted_at
  async delete(id: string) {
    return this.prisma.anggota.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  // (Optional) Restore data
  async restore(id: string) {
    return this.prisma.anggota.update({
      where: { id },
      data: {
        deleted_at: null,
      },
    });
  }
}
