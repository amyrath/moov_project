"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const csv_entity_1 = require("./csv/csv.entity");
const tgz_entity_1 = require("./tgz/tgz.entity");
let SearchService = class SearchService {
    csvRepo;
    tgzRepo;
    constructor(csvRepo, tgzRepo) {
        this.csvRepo = csvRepo;
        this.tgzRepo = tgzRepo;
    }
    async search(criteria) {
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
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(csv_entity_1.Csv)),
    __param(1, (0, typeorm_1.InjectRepository)(tgz_entity_1.Tgz)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map