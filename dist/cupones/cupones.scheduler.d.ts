import { CuponesService } from './cupones.service';
import { SociosService } from '../socios/socios.service';
export declare class CuponesScheduler {
    private readonly cuponesService;
    private readonly sociosService;
    private readonly logger;
    constructor(cuponesService: CuponesService, sociosService: SociosService);
    emisionMensual(): Promise<void>;
}
