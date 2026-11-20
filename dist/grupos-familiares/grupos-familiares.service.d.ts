import { Repository } from 'typeorm';
import { GrupoFamiliar } from './entities/grupo-familiar.entity';
import { CreateGrupoFamiliarDto } from './dto/create-grupo-familiar.dto';
import { Socio } from '../socios/entities/socio.entity';
import { ConfiguracionService } from '../configuracion/configuracion.service';
export declare class GruposFamiliaresService {
    private readonly repo;
    private readonly sociosRepo;
    private readonly configuracionService;
    constructor(repo: Repository<GrupoFamiliar>, sociosRepo: Repository<Socio>, configuracionService: ConfiguracionService);
    create(dto: CreateGrupoFamiliarDto): Promise<GrupoFamiliar>;
    findAll(): Promise<GrupoFamiliar[]>;
    findOne(id: number): Promise<GrupoFamiliar>;
    quitarIntegrante(grupoId: number, socioId: number): Promise<GrupoFamiliar>;
}
