import { CasillerosService } from './casilleros.service';
import { CreateCasilleroDto } from './dto/create-casillero.dto';
import { QueryCasilleroDto } from './dto/query-casillero.dto';
export declare class CasillerosController {
    private readonly service;
    constructor(service: CasillerosService);
    create(dto: CreateCasilleroDto): Promise<import("./entities/casillero.entity").Casillero>;
    findAll(query: QueryCasilleroDto): Promise<import("./entities/casillero.entity").Casillero[]>;
    findOne(id: number): Promise<import("./entities/casillero.entity").Casillero>;
    alquilar(id: number, socioId: number): Promise<import("./entities/casillero.entity").Casillero>;
    liberar(id: number): Promise<import("./entities/casillero.entity").Casillero>;
    update(id: number, dto: any): Promise<import("./entities/casillero.entity").Casillero>;
}
