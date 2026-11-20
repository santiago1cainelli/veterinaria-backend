import { SociosService } from './socios.service';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { QuerySocioDto } from './dto/query-socio.dto';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
export declare class SociosController {
    private readonly sociosService;
    constructor(sociosService: SociosService);
    create(dto: CreateSocioDto): Promise<import("./entities/socio.entity").Socio>;
    findAll(query: QuerySocioDto): Promise<import("./entities/socio.entity").Socio[]>;
    findMe(user: AuthenticatedUser): Promise<import("./entities/socio.entity").Socio>;
    findOne(id: number, user: AuthenticatedUser): Promise<import("./entities/socio.entity").Socio>;
    update(id: number, dto: UpdateSocioDto, user: AuthenticatedUser): Promise<import("./entities/socio.entity").Socio>;
    remove(id: number, user: AuthenticatedUser): Promise<{
        message: string;
    }>;
    reactivar(id: number): Promise<import("./entities/socio.entity").Socio>;
    private assertPropioSocioOAdmin;
}
