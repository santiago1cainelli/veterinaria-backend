import { EstadoCupon } from '../../common/enums/estado-cupon.enum';
import { ZonaCobro } from '../../common/enums/zona-cobro.enum';
export declare class QueryCuponDto {
    socioId?: number;
    cobradorId?: number;
    zona?: ZonaCobro;
    estado?: EstadoCupon;
    periodo?: string;
}
