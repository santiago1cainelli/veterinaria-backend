import { Socio } from '../../socios/entities/socio.entity';
export declare class Casillero {
    id: number;
    numero: number;
    socio: Socio | null;
    costoMensual: number;
    fechaAlquiler: Date | null;
}
