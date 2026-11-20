import { Repository } from 'typeorm';
import { Socio } from './entities/socio.entity';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { QuerySocioDto } from './dto/query-socio.dto';
import { ConfiguracionService } from '../configuracion/configuracion.service';
export declare class SociosService {
    private readonly repo;
    private readonly configuracionService;
    constructor(repo: Repository<Socio>, configuracionService: ConfiguracionService);
    create(dto: CreateSocioDto): Promise<Socio>;
    findAll(query: QuerySocioDto): Promise<Socio[]>;
    private aplicarOrden;
    findOne(id: number): Promise<Socio>;
    update(id: number, dto: UpdateSocioDto): Promise<Socio>;
    remove(id: number): Promise<{
        message: string;
    }>;
    recalcularCategoriasDeTodos(): Promise<void>;
    private calcularCategoria;
    private assertDniYEmailDisponibles;
    findByIdOrFail(id: number): Promise<Socio>;
    marcarMoroso(socio: Socio): Promise<Socio>;
    suspender(socio: Socio): Promise<Socio>;
    reactivar(id: number): Promise<Socio>;
    save(socio: Socio): Promise<Socio>;
}
