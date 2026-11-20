import { CobradoresService } from './cobradores.service';
import { CreateCobradorDto } from './dto/create-cobrador.dto';
import { UpdateCobradorDto } from './dto/update-cobrador.dto';
export declare class CobradoresController {
    private readonly service;
    constructor(service: CobradoresService);
    create(dto: CreateCobradorDto): Promise<import("./entities/cobrador.entity").Cobrador>;
    findAll(): Promise<import("./entities/cobrador.entity").Cobrador[]>;
    findOne(id: number): Promise<import("./entities/cobrador.entity").Cobrador>;
    update(id: number, dto: UpdateCobradorDto): Promise<import("./entities/cobrador.entity").Cobrador>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
