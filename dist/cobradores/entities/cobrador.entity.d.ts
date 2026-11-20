import { ZonaCobro } from '../../common/enums/zona-cobro.enum';
import { Cupon } from '../../cupones/entities/cupon.entity';
import { User } from '../../users/entities/user.entity';
export declare class Cobrador {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    zona: ZonaCobro;
    comisionPorcentaje: number;
    cupones: Cupon[];
    user: User | null;
    createdAt: Date;
}
