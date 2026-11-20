import { ZonaCobro } from '../../common/enums/zona-cobro.enum';
export declare class CreateCobradorDto {
    nombre: string;
    apellido: string;
    correo: string;
    zona: ZonaCobro;
    comisionPorcentaje?: number;
}
