// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Utilisateur introuvable');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Mot de passe invalide');

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
