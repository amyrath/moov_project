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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    usersRepository;
    jwtService;
    userService;
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async postSignup(body) {
        try {
            const { password } = body;
            const hash = await bcrypt.hash(password, 10);
            const user = this.usersRepository.create({ ...body, password: hash });
            await this.usersRepository.save(user);
            return "Utilisateur créer!";
        }
        catch (error) {
            throw new common_1.ConflictException(error.message);
        }
    }
    async postLogin(body) {
        const { password, email } = body;
        const user = await this.usersRepository.findOne({ where: { email: email } });
        if (!user)
            throw new common_1.NotFoundException("Cet utilisateur n'existe pas");
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new common_1.UnauthorizedException("Mot de passe invalide");
        return this.authentificateUser({ user: user });
    }
    async authentificateUser({ user }) {
        const payload = { user };
        return { access_token: await this.jwtService.sign(payload) };
    }
    async validateUserById(userId) {
        return this.userService.findOneById(userId);
    }
};
exports.UserService = UserService;
__decorate([
    (0, common_1.UseGuards)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "authentificateUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map