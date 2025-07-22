import { SignupDto } from './dtos/SignupDto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/LoginDto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly usersRepository;
    private readonly jwtService;
    userService: any;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    postSignup(body: SignupDto): Promise<string>;
    postLogin(body: LoginDto): Promise<{
        access_token: string;
    }>;
    private authentificateUser;
    validateUserById(userId: string): Promise<any>;
}
