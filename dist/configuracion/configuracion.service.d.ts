import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Configuracion } from './entities/configuracion.entity';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';
export declare class ConfiguracionService implements OnModuleInit {
    private readonly repo;
    constructor(repo: Repository<Configuracion>);
    onModuleInit(): Promise<void>;
    getOrCreate(): Promise<Configuracion>;
    update(dto: UpdateConfiguracionDto): Promise<Configuracion>;
}
