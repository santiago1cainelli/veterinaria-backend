import { Role } from '../../common/enums/role.enum';
export interface AuthenticatedUser {
    userId: number;
    email: string;
    role: Role;
    socioId?: number | null;
    instructorId?: number | null;
    cobradorId?: number | null;
}
