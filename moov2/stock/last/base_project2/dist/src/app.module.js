"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/user.entity");
const config_1 = require("@nestjs/config");
const jwt_auth_guard_1 = require("../src2/search/auth/jwt-auth.guard");
const search_module_1 = require("../src2/search/search.module");
const csv_entity_1 = require("../src2/search/csv/csv.entity");
const tgz_entity_1 = require("../src2/search/tgz/tgz.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'papa',
                database: 'blog',
                entities: [user_entity_1.User],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([csv_entity_1.Csv, tgz_entity_1.Tgz]),
            user_module_1.UserModule,
            search_module_1.SearchModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_auth_guard_1.JwtAuthGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map