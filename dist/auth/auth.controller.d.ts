import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: AuthenticatedUser;
    }>;
    me(user: AuthenticatedUser): Promise<Omit<import("../users/entities/user.entity").User, "password">>;
    changePassword(user: AuthenticatedUser, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
