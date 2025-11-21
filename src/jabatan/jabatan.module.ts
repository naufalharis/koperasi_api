import { Module } from '@nestjs/common';
import { JabatanController } from './jabatan.controller';
import { JabatanService } from './jabatan.service';

@Module({
  controllers: [JabatanController],
  providers: [JabatanService],
})
export class JabatanModule {}
