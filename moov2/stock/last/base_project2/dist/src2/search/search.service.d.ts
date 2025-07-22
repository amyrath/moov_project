import { Repository } from 'typeorm';
import { Csv } from './csv/csv.entity';
import { Tgz } from './tgz/tgz.entity';
export declare class SearchService {
    private readonly csvRepo;
    private readonly tgzRepo;
    constructor(csvRepo: Repository<Csv>, tgzRepo: Repository<Tgz>);
    search(criteria: {
        type_cdr?: string;
        month?: string;
        year?: string;
        client?: string;
        extension?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        csv: {
            data: Csv[];
            total: number;
        };
        tgz: {
            data: Tgz[];
            total: number;
        };
        page: number;
        limit: number;
    }>;
}
