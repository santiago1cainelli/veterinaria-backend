import { RendicionesService } from './rendiciones.service';
import { CreateRendicionDto } from './dto/create-rendicion.dto';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
export declare class RendicionesController {
    private readonly service;
    constructor(service: RendicionesService);
    create(dto: CreateRendicionDto, user: AuthenticatedUser): Promise<import("./entities/rendicion.entity").Rendicion>;
    findAll(cobradorId: string | undefined, user: AuthenticatedUser): Promise<import("./entities/rendicion.entity").Rendicion[]>;
    findOne(id: number, user: AuthenticatedUser): Promise<import("./entities/rendicion.entity").Rendicion>;
    update(id: number): Promise<import("./entities/rendicion.entity").Rendicion>;
}
