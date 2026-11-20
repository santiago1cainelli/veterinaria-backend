import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
export declare class InscripcionesController {
    private readonly service;
    constructor(service: InscripcionesService);
    inscribir(dto: CreateInscripcionDto, user: AuthenticatedUser): Promise<import("./entities/inscripcion.entity").Inscripcion>;
    darDeBaja(id: number): Promise<{
        message: string;
    }>;
    darDeBajaPorSocioYActividad(socioId: number, actividadId: number): Promise<{
        message: string;
    }>;
    buscar(actividadId?: string, socioId?: string, user?: AuthenticatedUser): Promise<import("./entities/inscripcion.entity").Inscripcion[]> | never[];
}
