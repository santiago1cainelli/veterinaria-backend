import { ConfiguracionService } from './configuracion.service';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';
export declare class ConfiguracionController {
    private readonly service;
    constructor(service: ConfiguracionService);
    get(): Promise<import("./entities/configuracion.entity").Configuracion>;
    update(dto: UpdateConfiguracionDto): Promise<import("./entities/configuracion.entity").Configuracion>;
}
