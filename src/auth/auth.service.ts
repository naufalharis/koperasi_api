import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // -------------------- LOGIN VALIDATION --------------------
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.anggota.findFirst({
      where: { email, deleted_at: null },
    });

    if (!user) throw new UnauthorizedException('User tidak ditemukan');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password salah');

    // hilangkan password sebelum return
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      nama: user.nama,
      jabatan: user.id_jabatan,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  // -------------------- REGISTER --------------------
  async register(data: {
    nama: string;
    email: string;
    password: string;
    id_jabatan: string;
    alamat?: string;
    no_hp?: string;
  }) {
    try {
      const hashed = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.anggota.create({
        data: { ...data, password: hashed },
      });

      // hapus password sebelum return
      const { password: _, ...result } = user;
      return result;
    } catch (error: any) {
      // handle duplicate email
      if (error.code === 'P2002') {
        throw new BadRequestException('Email sudah terdaftar');
      }
      // handle invalid foreign key
      if (error.code === 'P2003') {
        throw new BadRequestException('Jabatan tidak valid');
      }
      console.log('Register error:', error);
      throw error; // biar NestJS return 500 jika unknown
    }
  }

  // -------------------- GET ALL ACTIVE --------------------
  async findAll() {
    return this.prisma.anggota.findMany({
      where: { deleted_at: null },
      include: { jabatan: true },
    });
  }

  // -------------------- GET BY ID ACTIVE --------------------
  async findById(id: string) {
    const user = await this.prisma.anggota.findFirst({
      where: { id, deleted_at: null },
      include: { jabatan: true },
    });

    if (!user) throw new BadRequestException('User tidak ditemukan');
    return user;
  }

  // -------------------- UPDATE --------------------
  async update(
    id: string,
    data: {
      nama?: string;
      email?: string;
      password?: string;
      id_jabatan?: string;
      alamat?: string;
      no_hp?: string;
    },
  ) {
    try {
      const updateData = { ...data };
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }
      return this.prisma.anggota.update({
        where: { id },
        data: updateData,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email sudah terpakai');
      }
      console.log('Update error:', error);
      throw error;
    }
  }

  // -------------------- SOFT DELETE --------------------
  async softDelete(id: string) {
    return this.prisma.anggota.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  // -------------------- GET ALL WITH DELETED --------------------
  async findAllWithDeleted() {
    return this.prisma.anggota.findMany({
      include: { jabatan: true },
    });
  }

  // -------------------- GET ONLY DELETED --------------------
  async findDeleted() {
    return this.prisma.anggota.findMany({
      where: { deleted_at: { not: null } },
      include: { jabatan: true },
    });
  }

  // -------------------- RESTORE --------------------
  async restore(id: string) {
    return this.prisma.anggota.update({
      where: { id },
      data: { deleted_at: null },
    });
  }
}