import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(client: string, type_cdr: string, year: string, month: string, extension: string): Promise<{
        csv: {
            data: import("./csv/csv.entity").Csv[];
            total: number;
        };
        tgz: {
            data: import("./tgz/tgz.entity").Tgz[];
            total: number;
        };
        page: number;
        limit: number;
    }>;
}
