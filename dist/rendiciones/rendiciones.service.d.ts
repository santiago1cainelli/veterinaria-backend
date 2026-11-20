import { DataSource, Repository } from 'typeorm';
import { Rendicion } from './entities/rendicion.entity';
import { CreateRendicionDto } from './dto/create-rendicion.dto';
import { Cobrador } from '../cobradores/entities/cobrador.entity';
import { Cupon } from '../cupones/entities/cupon.entity';
import { Socio } from '../socios/entities/socio.entity';
export declare class RendicionesService {
    private readonly repo;
    private readonly cobradoresRepo;
    private readonly cuponesRepo;
    private readonly sociosRepo;
    private readonly dataSource;
    constructor(repo: Repository<Rendicion>, cobradoresRepo: Repository<Cobrador>, cuponesRepo: Repository<Cupon>, sociosRepo: Repository<Socio>, dataSource: DataSource);
    create(dto: CreateRendicionDto): Promise<Rendicion>;
    findAll(cobradorId?: number): Promise<Rendicion[]>;
    findOne(id: number): Promise<Rendicion>;
}
