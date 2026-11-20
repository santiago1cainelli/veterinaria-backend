import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: AuthenticatedUser): Promise<AuthenticatedUser>;
}
export {};
