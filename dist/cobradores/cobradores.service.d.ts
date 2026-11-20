import { Repository } from 'typeorm';
import { Cobrador } from './entities/cobrador.entity';
import { CreateCobradorDto } from './dto/create-cobrador.dto';
import { UpdateCobradorDto } from './dto/update-cobrador.dto';
export declare class CobradoresService {
    private readonly repo;
    constructor(repo: Repository<Cobrador>);
    create(dto: CreateCobradorDto): Promise<Cobrador>;
    findAll(): Promise<Cobrador[]>;
    findOne(id: number): Promise<Cobrador>;
    update(id: number, dto: UpdateCobradorDto): Promise<Cobrador>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
