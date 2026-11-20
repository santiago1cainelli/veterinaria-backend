import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { ConfiguracionService } from '../configuracion/configuracion.service';
export declare class ActividadesService {
    private readonly repo;
    private readonly configuracionService;
    constructor(repo: Repository<Actividad>, configuracionService: ConfiguracionService);
    create(dto: CreateActividadDto): Promise<Actividad>;
    findAll(soloActivas?: boolean): Promise<Actividad[]>;
    findOne(id: number): Promise<Actividad>;
    update(id: number, dto: UpdateActividadDto): Promise<Actividad>;
    remove(id: number): Promise<{
        message: string;
    }>;
    listadoAsistencia(): Promise<Actividad[]>;
}
