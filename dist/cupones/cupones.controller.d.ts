import { CuponesService } from './cupones.service';
import { QueryCuponDto } from './dto/query-cupon.dto';
import { PagarCuponDto } from './dto/pagar-cupon.dto';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
export declare class CuponesController {
    private readonly service;
    constructor(service: CuponesService);
    findAll(query: QueryCuponDto, user: AuthenticatedUser): Promise<import("./entities/cupon.entity").Cupon[]>;
    findOne(id: number, user: AuthenticatedUser): Promise<import("./entities/cupon.entity").Cupon>;
    pagar(id: number, dto: PagarCuponDto): Promise<import("./entities/cupon.entity").Cupon>;
    devolver(id: number): Promise<import("./entities/cupon.entity").Cupon>;
    update(id: number, dto: any): Promise<import("./entities/cupon.entity").Cupon>;
    generarMensual(periodo?: string): Promise<{
        generados: number;
        reemitidos: number;
        sociosSuspendidos: number;
    }>;
}
