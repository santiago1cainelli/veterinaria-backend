import { Turno } from '../../common/enums/turno.enum';
import { Instructor } from '../../instructores/entities/instructor.entity';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';
export declare class Actividad {
    id: number;
    nombre: string;
    descripcion: string;
    arancel: number;
    turno: Turno;
    diasSemana: string;
    horaInicio: string;
    horaFin: string;
    cupoMaximo: number | null;
    instructor: Instructor | null;
    inscripciones: Inscripcion[];
    activa: boolean;
    createdAt: Date;
}
