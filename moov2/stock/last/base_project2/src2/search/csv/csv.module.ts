import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Csv } from './csv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Csv])],
  exports: [TypeOrmModule],
})
export class CsvModule {}
