import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.anggota.findUnique({ where: { email } });
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

  async findAll() {
  return this.prisma.anggota.findMany({
    include: { jabatan: true },
  });
}

async findById(id: string) {
  return this.prisma.anggota.findUnique({
    where: { id },
    include: { jabatan: true },
  });
}

async update(id: string, data: {
  nama?: string;
  email?: string;
  password?: string;
  id_jabatan?: string;
  alamat?: string;
  no_hp?: string;
}) {
  // Hash password jika ikut diupdate
  let updateData: any = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return this.prisma.anggota.update({
    where: { id },
    data: updateData,
  });
}

async delete(id: string) {
  return this.prisma.anggota.delete({
    where: { id },
  });
}


}