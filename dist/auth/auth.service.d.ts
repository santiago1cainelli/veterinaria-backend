import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
export declare class AuthService {
    private readonly usersRepo;
    private readonly jwtService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: AuthenticatedUser;
    }>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    me(userId: number): Promise<Omit<User, 'password'>>;
}
