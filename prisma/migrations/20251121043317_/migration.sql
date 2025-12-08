-- CreateTable
CREATE TABLE "jabatan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggota" (
    "id" TEXT NOT NULL,
    "id_jabatan" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alamat" TEXT,
    "no_hp" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "anggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_simpanan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "kategori_simpanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabungan" (
    "id" TEXT NOT NULL,
    "id_anggota" TEXT NOT NULL,
    "id_kategori_simpanan" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "tabungan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penarikan" (
    "id" TEXT NOT NULL,
    "id_anggota" TEXT NOT NULL,
    "id_tabungan" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "penarikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_jangka_waktu" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "kategori_jangka_waktu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pinjaman" (
    "id" TEXT NOT NULL,
    "id_anggota" TEXT NOT NULL,
    "id_jangka_waktu" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "tanggal_jatuh_tempo" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "pinjaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "angsuran" (
    "id" TEXT NOT NULL,
    "pinjaman_id" TEXT NOT NULL,
    "tanggal_pembayaran" TIMESTAMP(3) NOT NULL,
    "jumlah_pembayaran" DOUBLE PRECISION NOT NULL,
    "sisa_pinjaman" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "angsuran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kas_koperasi" (
    "id" TEXT NOT NULL,
    "nominal" DOUBLE PRECISION NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "kas_koperasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anggota_email_key" ON "anggota"("email");

-- AddForeignKey
ALTER TABLE "anggota" ADD CONSTRAINT "anggota_id_jabatan_fkey" FOREIGN KEY ("id_jabatan") REFERENCES "jabatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabungan" ADD CONSTRAINT "tabungan_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tabungan" ADD CONSTRAINT "tabungan_id_kategori_simpanan_fkey" FOREIGN KEY ("id_kategori_simpanan") REFERENCES "kategori_simpanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penarikan" ADD CONSTRAINT "penarikan_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penarikan" ADD CONSTRAINT "penarikan_id_tabungan_fkey" FOREIGN KEY ("id_tabungan") REFERENCES "tabungan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinjaman" ADD CONSTRAINT "pinjaman_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinjaman" ADD CONSTRAINT "pinjaman_id_jangka_waktu_fkey" FOREIGN KEY ("id_jangka_waktu") REFERENCES "kategori_jangka_waktu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "angsuran" ADD CONSTRAINT "angsuran_pinjaman_id_fkey" FOREIGN KEY ("pinjaman_id") REFERENCES "pinjaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
