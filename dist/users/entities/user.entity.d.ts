import { Role } from '../../common/enums/role.enum';
import { Socio } from '../../socios/entities/socio.entity';
import { Instructor } from '../../instructores/entities/instructor.entity';
import { Cobrador } from '../../cobradores/entities/cobrador.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    role: Role;
    activo: boolean;
    socio: Socio | null;
    instructor: Instructor | null;
    cobrador: Cobrador | null;
    createdAt: Date;
}
