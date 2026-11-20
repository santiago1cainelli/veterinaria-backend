import { Rendicion } from './rendicion.entity';
import { Cupon } from '../../cupones/entities/cupon.entity';
export declare class RendicionDetalle {
    id: number;
    rendicion: Rendicion;
    cupon: Cupon;
    importeCobrado: number;
    cobrado: boolean;
}
