import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignupDto } from './dtos/SignupDto';
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    postSignup(body: SignupDto): Promise<string>;
    findByEmail(email: string): Promise<User>;
    findOneById(id: number): Promise<User>;
}
