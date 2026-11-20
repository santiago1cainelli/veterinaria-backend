import { Socio } from '../../socios/entities/socio.entity';
export declare class GrupoFamiliar {
    id: number;
    cuotaGrupal: number;
    integrantes: Socio[];
    createdAt: Date;
}
