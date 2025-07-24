/*import { ConflictException, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { SignupDto } from './dtos/SignupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/LoginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    findByEmail(email: string) {
        throw new Error('Method not implemented.');
    }
    userService: any;
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>, private readonly jwtService: JwtService) { }

    async postSignup(body: SignupDto): Promise<string> {
        try {
            const { password } = body;
            const hash = await bcrypt.hash(password, 10);
            const user = this.usersRepository.create({ ...body, password: hash }); //enregistrer l'user
            await this.usersRepository.save(user);
            return "Utilisateur créer!";
        } catch (error) {
            throw new ConflictException(error.message)
        }
    }

    async postLogin(body: LoginDto) {
        const { password, email } = body;
        const user = await this.usersRepository.findOne({ where: { email: email } })
        if (!user) throw new NotFoundException("Cet utilisateur n'existe pas");
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new UnauthorizedException("Mot de passe invalide") 
        //return user;
        return this.authentificateUser({user : user});
    }

    @UseGuards()
    private async authentificateUser({ user }: { user: User }) {
        const payload = { user }
        return { access_token: await this.jwtService.sign(payload) }
    }

    async validateUserById(userId: string): Promise<any> {
        return this.userService.findOneById(userId);
    }
    
}
*/

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from './dtos/SignupDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async postSignup(body: SignupDto): Promise<string> {
    const hash = await bcrypt.hash(body.password, 10);
    const user = this.usersRepository.create({ ...body, password: hash });
    await this.usersRepository.save(user);
    return 'Utilisateur créé';
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
}
