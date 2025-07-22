// src/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Csv } from './csv/csv.entity';
import { Tgz } from './tgz/tgz.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Csv)
    private readonly csvRepo: Repository<Csv>,
    @InjectRepository(Tgz)
    private readonly tgzRepo: Repository<Tgz>,
  ) {}

  async search(criteria: {
    type_cdr?: string;
    month?: string;
    year?: string;
    client?: string;
    extension?: string;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 10, ...filters } = criteria;

    const csvQuery = this.csvRepo.createQueryBuilder('csv');
    const tgzQuery = this.tgzRepo.createQueryBuilder('tgz');

    if (filters.type_cdr) {
      csvQuery.andWhere('csv.type_cdr = :type_cdr', { type_cdr: filters.type_cdr });
      tgzQuery.andWhere('tgz.type_cdr = :type_cdr', { type_cdr: filters.type_cdr });
    }

    if (filters.month) {
      tgzQuery.andWhere('tgz.month = :month', { month: filters.month });
    }

    if (filters.year) {
      tgzQuery.andWhere('tgz.year = :year', { year: filters.year });
    }

    if (filters.client) {
      csvQuery.andWhere('csv.client = :client', { client: filters.client });
    }

    if (filters.extension) {
      tgzQuery.andWhere('tgz.extension = :extension', { extension: filters.extension });
    }

    const [csvResults, csvTotal] = await csvQuery
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const [tgzResults, tgzTotal] = await tgzQuery
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      csv: { data: csvResults, total: csvTotal },
      tgz: { data: tgzResults, total: tgzTotal },
      page,
      limit,
    };
  }
}
