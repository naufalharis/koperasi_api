import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };

  const jabatanNamaList = ['Owner', 'Teller', 'Nasabah'];
  const jabatanMap: Record<string, any> = {};

  for (const nama of jabatanNamaList) {
    let jabatan = await prisma.jabatan.findFirst({
      where: { nama },
    });

    if (!jabatan) {
      jabatan = await prisma.jabatan.create({
        data: { nama },
      });
      console.log(`✅ Jabatan ${nama} dibuat`);
    } else {
      console.log(`ℹ️ Jabatan ${nama} sudah ada`);
    }

    jabatanMap[nama] = jabatan;
  }

  const anggotaList = [
    {
      nama: 'Owner',
      email: 'owner@koperasi.com',
      password: 'password123',
      jabatan: 'Owner',
      alamat: 'Jl. Sudirman No. 10',
      no_hp: '08123456780',
    },
    {
      nama: 'Teller',
      email: 'teller@koperasi.com',
      password: 'password123',
      jabatan: 'Teller',
      alamat: 'Jl. Ahmad Yani No. 5',
      no_hp: '08123456781',
    },
    {
      nama: 'Nasabah',
      email: 'nasabah@koperasi.com',
      password: 'password123',
      jabatan: 'Nasabah',
      alamat: 'Jl. Kenanga No. 3',
      no_hp: '08123456782',
    },
  ];

  for (const data of anggotaList) {
    const existing = await prisma.anggota.findUnique({
      where: { email: data.email },
    });

    if (!existing) {
      await prisma.anggota.create({
        data: {
          nama: data.nama,
          email: data.email,
          password: await hashPassword(data.password),
          id_jabatan: jabatanMap[data.jabatan].id,
          alamat: data.alamat,
          no_hp: data.no_hp,
        },
      });
      console.log(`✅ Anggota baru dibuat: ${data.email}`);
    } else {
      console.log(`ℹ️ Anggota ${data.email} sudah ada, skip create`);
    }
  }
}

main()
  .catch((err) => {
    console.error('❌ Error saat seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
