import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKasDto } from './dto/create-kas.dto';
import { UpdateKasDto } from './dto/update-kas.dto';
import { KasQueryDto } from './dto/kas-query.dto';

@Injectable()
export class KasKoperasiService {
  constructor(private readonly prisma: PrismaService) {}

  // create: terima userId opsional (dari controller)
  async create(createKasDto: CreateKasDto, userId?: string) {
    const data: any = {
      nominal: createKasDto.nominal,
      tanggal: new Date(createKasDto.tanggal),
      // note: createKasDto.note ?? null,
      created_by: userId ?? null,
    };
    return this.prisma.kasKoperasi.create({ data });
  }

  // findAll: exclude deleted by default, support pagination/filter/sort
  async findAll(params: KasQueryDto & { includeDeleted?: boolean } = {}) {
    const page = params.page && params.page > 0 ? Number(params.page) : 1;
    const perPage = params.perPage && params.perPage > 0 ? Math.min(Number(params.perPage), 100) : 20;
    const skip = (page - 1) * perPage;

    const allowedSort = ['tanggal', 'nominal', 'created_at'];
    const sortField = params.sort && allowedSort.includes(params.sort) ? params.sort : 'tanggal';
    const sortOrder = params.order === 'asc' ? 'asc' : 'desc';

    const where: any = {};

    // exclude soft-deleted unless includeDeleted true
    if (!params.includeDeleted) where.deleted_at = null;

    if (params.from || params.to) {
      where.tanggal = {};
      if (params.from) where.tanggal.gte = new Date(params.from);
      if (params.to) where.tanggal.lte = new Date(params.to);
    }

    const min = params.min !== undefined && params.min !== null ? Number(params.min) : undefined;
    const max = params.max !== undefined && params.max !== null ? Number(params.max) : undefined;
    if (min !== undefined || max !== undefined) {
      where.nominal = {};
      if (min !== undefined) where.nominal.gte = min;
      if (max !== undefined) where.nominal.lte = max;
    }

    const [data, total] = await Promise.all([
      this.prisma.kasKoperasi.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { [sortField]: sortOrder },
      }),
      this.prisma.kasKoperasi.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        perPage,
        lastPage: Math.ceil(total / perPage),
      },
    };
  }

  async findOne(id: string, includeDeleted = false) {
    const where: any = { id };
    if (!includeDeleted) where.deleted_at = null;

    const item = await this.prisma.kasKoperasi.findFirst({ where });
    if (!item) throw new NotFoundException(`Kas dengan id ${id} tidak ditemukan`);
    return item;
  }

  // update: isi updated_by
  async update(id: string, updateKasDto: UpdateKasDto, userId?: string) {
    await this.findOne(id); // pastikan ada & tidak deleted

    const data: any = {};
    if (updateKasDto.nominal !== undefined) data.nominal = updateKasDto.nominal;
    if (updateKasDto.tanggal !== undefined) data.tanggal = new Date(updateKasDto.tanggal as any);
    // if (updateKasDto.note !== undefined) data.note = updateKasDto.note;

    data.updated_by = userId ?? null;

    return this.prisma.kasKoperasi.update({ where: { id }, data });
  }

  // soft-delete: set deleted_at + updated_by
  async remove(id: string, userId?: string) {
    await this.findOne(id); // pastikan ada & tidak already deleted
    return this.prisma.kasKoperasi.update({
      where: { id },
      data: { deleted_at: new Date(), updated_by: userId ?? null },
    });
  }

  // restore (undo soft-delete)
  async restore(id: string, userId?: string) {
    const item = await this.findOne(id, true); // includeDeleted = true because it might be deleted
    if (!item || !item.deleted_at) throw new NotFoundException(`Kas tidak dalam keadaan terhapus`);
    return this.prisma.kasKoperasi.update({
      where: { id },
      data: { deleted_at: null, updated_by: userId ?? null },
    });
  }

  // hard delete (force) — gunakan dengan hati-hati
  async forceDelete(id: string) {
    await this.findOne(id, true); // memastikan ada
    return this.prisma.kasKoperasi.delete({ where: { id } });
  }
}