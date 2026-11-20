import { ZonaCobro } from '../../common/enums/zona-cobro.enum';
import { EstadoCupon } from '../../common/enums/estado-cupon.enum';
import { Socio } from '../../socios/entities/socio.entity';
import { Cobrador } from '../../cobradores/entities/cobrador.entity';
import { GrupoFamiliar } from '../../grupos-familiares/entities/grupo-familiar.entity';
export declare class Cupon {
    id: number;
    socio: Socio;
    grupoFamiliar: GrupoFamiliar | null;
    periodo: string;
    zona: ZonaCobro;
    cobrador: Cobrador | null;
    montoCuotaSocial: number;
    montoActividades: number;
    montoCasillero: number;
    recargoPorcentaje: number;
    montoTotal: number;
    estado: EstadoCupon;
    esReemision: boolean;
    detalle: string;
    fechaPago: Date | null;
    fechaEmision: Date;
}
