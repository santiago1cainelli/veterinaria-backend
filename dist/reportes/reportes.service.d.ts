import { SociosService } from '../socios/socios.service';
import { ActividadesService } from '../actividades/actividades.service';
import { CasillerosService } from '../casilleros/casilleros.service';
import { QuerySocioDto } from '../socios/dto/query-socio.dto';
import { QueryCasilleroDto } from '../casilleros/dto/query-casillero.dto';
export declare class ReportesService {
    private readonly sociosService;
    private readonly actividadesService;
    private readonly casillerosService;
    constructor(sociosService: SociosService, actividadesService: ActividadesService, casillerosService: CasillerosService);
    listadoSocios(query: QuerySocioDto): Promise<import("../socios/entities/socio.entity").Socio[]>;
    listadoAsistenciaPorActividad(): Promise<import("../actividades/entities/actividad.entity").Actividad[]>;
    listadoCasilleros(query: QueryCasilleroDto): Promise<import("../casilleros/entities/casillero.entity").Casillero[]>;
}
