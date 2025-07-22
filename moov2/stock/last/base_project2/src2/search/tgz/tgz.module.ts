import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tgz } from './tgz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tgz])],
  exports: [TypeOrmModule],
})
export class TgzModule {}
