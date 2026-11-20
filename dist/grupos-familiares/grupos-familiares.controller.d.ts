import { GruposFamiliaresService } from './grupos-familiares.service';
import { CreateGrupoFamiliarDto } from './dto/create-grupo-familiar.dto';
export declare class GruposFamiliaresController {
    private readonly service;
    constructor(service: GruposFamiliaresService);
    create(dto: CreateGrupoFamiliarDto): Promise<import("./entities/grupo-familiar.entity").GrupoFamiliar>;
    findAll(): Promise<import("./entities/grupo-familiar.entity").GrupoFamiliar[]>;
    findOne(id: number): Promise<import("./entities/grupo-familiar.entity").GrupoFamiliar>;
    quitarIntegrante(id: number, socioId: number): Promise<import("./entities/grupo-familiar.entity").GrupoFamiliar>;
}
