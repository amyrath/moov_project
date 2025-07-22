import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dtos/LoginDto';
import { UserService } from './user.service';
import { SignupDto } from './dtos/SignupDto';
export declare class UserController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signup(body: SignupDto): Promise<string>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
