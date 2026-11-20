import { Turno } from '../../common/enums/turno.enum';
export declare class CreateActividadDto {
    nombre: string;
    descripcion?: string;
    arancel: number;
    turno: Turno;
    diasSemana?: string;
    horaInicio?: string;
    horaFin?: string;
    cupoMaximo?: number;
    instructorId?: number;
}
