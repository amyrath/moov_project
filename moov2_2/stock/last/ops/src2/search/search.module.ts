import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Csv } from './csv/csv.entity';
import { Tgz } from './tgz/tgz.entity';
import { CsvModule } from './csv/csv.module';
import { TgzModule } from './tgz/tgz.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    CsvModule,
    TgzModule,
    TypeOrmModule.forFeature([Csv, Tgz]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}
