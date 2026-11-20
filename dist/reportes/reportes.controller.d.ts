import { ReportesService } from './reportes.service';
import { QuerySocioDto } from '../socios/dto/query-socio.dto';
import { QueryCasilleroDto } from '../casilleros/dto/query-casillero.dto';
export declare class ReportesController {
    private readonly service;
    constructor(service: ReportesService);
    socios(query: QuerySocioDto): Promise<import("../socios/entities/socio.entity").Socio[]>;
    asistencia(): Promise<import("../actividades/entities/actividad.entity").Actividad[]>;
    casilleros(query: QueryCasilleroDto): Promise<import("../casilleros/entities/casillero.entity").Casillero[]>;
}
