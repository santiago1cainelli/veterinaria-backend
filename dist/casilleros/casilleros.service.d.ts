import { Repository } from 'typeorm';
import { Casillero } from './entities/casillero.entity';
import { CreateCasilleroDto } from './dto/create-casillero.dto';
import { QueryCasilleroDto } from './dto/query-casillero.dto';
import { Socio } from '../socios/entities/socio.entity';
import { ConfiguracionService } from '../configuracion/configuracion.service';
export declare class CasillerosService {
    private readonly repo;
    private readonly sociosRepo;
    private readonly configuracionService;
    constructor(repo: Repository<Casillero>, sociosRepo: Repository<Socio>, configuracionService: ConfiguracionService);
    create(dto: CreateCasilleroDto): Promise<Casillero>;
    findAll(query: QueryCasilleroDto): Promise<Casillero[]>;
    findOne(id: number): Promise<Casillero>;
    alquilar(casilleroId: number, socioId: number): Promise<Casillero>;
    liberar(casilleroId: number): Promise<Casillero>;
}
