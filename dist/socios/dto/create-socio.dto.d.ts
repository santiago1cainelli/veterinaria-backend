import { ZonaCobro } from '../../common/enums/zona-cobro.enum';
export declare class CreateSocioDto {
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
    fechaAlta?: string;
    direccion?: string;
    localidad?: string;
    telefono?: string;
    email: string;
    zonaCobro: ZonaCobro;
}
