import { SignupDto } from './dtos/SignupDto';
import { LoginDto } from './dtos/LoginDto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getSignup(): void;
    getlogin(): void;
    postSignup(body: SignupDto): Promise<{
        message: string;
    }>;
    postLogin(body: LoginDto, session: Record<string, any>): Promise<{
        access_token: string;
    }>;
    PostLOgout(session: Record<string, any>): void;
}
