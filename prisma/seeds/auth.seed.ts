import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

  // === Pastikan jabatan "Admin" ada ===
  let jabatan = await prisma.jabatan.findFirst({
    where: { nama: 'Admin' },
  });

  if (!jabatan) {
    jabatan = await prisma.jabatan.create({
      data: { nama: 'Admin' },
    });
  }

  // === Buat user admin ===
  const adminEmail = 'admin@koperasi.com';
  const existingAdmin = await prisma.anggota.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const anggota = await prisma.anggota.create({
      data: {
        nama: 'Admin Koperasi',
        email: adminEmail,
        password: await hashPassword('password123'),
        id_jabatan: jabatan.id,
        alamat: 'Jl. Merdeka No. 1',
        no_hp: '08123456789',
      },
    });
    console.log('✅ Admin baru dibuat:', anggota);
  } else {
    console.log('ℹ️ Admin sudah ada, skip create.');
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

