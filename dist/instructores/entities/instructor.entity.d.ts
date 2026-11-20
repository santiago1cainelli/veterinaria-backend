import { Actividad } from '../../actividades/entities/actividad.entity';
import { User } from '../../users/entities/user.entity';
export declare class Instructor {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    sueldo: number | null;
    actividades: Actividad[];
    user: User | null;
    createdAt: Date;
}
