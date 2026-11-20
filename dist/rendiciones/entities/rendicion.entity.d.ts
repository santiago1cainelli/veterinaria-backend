import { Cobrador } from '../../cobradores/entities/cobrador.entity';
import { RendicionDetalle } from './rendicion-detalle.entity';
export declare class Rendicion {
    id: number;
    cobrador: Cobrador;
    semanaInicio: Date;
    semanaFin: Date;
    montoRecaudado: number;
    comisionCalculada: number;
    montoNeto: number;
    esUltimaSemanaDelMes: boolean;
    detalles: RendicionDetalle[];
    fechaRendicion: Date;
}
