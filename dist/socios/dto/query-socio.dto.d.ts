import { OrdenSocio } from '../../common/enums/orden-socio.enum';
import { CategoriaSocial } from '../../common/enums/categoria-social.enum';
import { ZonaCobro } from '../../common/enums/zona-cobro.enum';
import { EstadoSocio } from '../../common/enums/estado-socio.enum';
export declare class QuerySocioDto {
    orden?: OrdenSocio;
    categoria?: CategoriaSocial;
    zonaCobro?: ZonaCobro;
    estado?: EstadoSocio;
    buscar?: string;
}
