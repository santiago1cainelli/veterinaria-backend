import { Repository } from 'typeorm';
import { Cupon } from './entities/cupon.entity';
import { QueryCuponDto } from './dto/query-cupon.dto';
import { PagarCuponDto } from './dto/pagar-cupon.dto';
import { Socio } from '../socios/entities/socio.entity';
import { Cobrador } from '../cobradores/entities/cobrador.entity';
import { ConfiguracionService } from '../configuracion/configuracion.service';
export declare class CuponesService {
    private readonly repo;
    private readonly sociosRepo;
    private readonly cobradoresRepo;
    private readonly configuracionService;
    private readonly logger;
    constructor(repo: Repository<Cupon>, sociosRepo: Repository<Socio>, cobradoresRepo: Repository<Cobrador>, configuracionService: ConfiguracionService);
    findAll(query: QueryCuponDto): Promise<Cupon[]>;
    findOne(id: number): Promise<Cupon>;
    pagar(id: number, dto: PagarCuponDto): Promise<Cupon>;
    generarCuponesMensuales(periodo?: string): Promise<{
        generados: number;
        reemitidos: number;
        sociosSuspendidos: number;
    }>;
    private reemitirCuponesImpagosConRecargo;
    private aplicarControlDeMorosidad;
    private montoCuotaPorCategoria;
    private cobradorDeZona;
    private sumarActividadesDelGrupo;
    private sumarCasillerosDelGrupo;
    findPendientesPorCobrador(cobradorId: number): Promise<Cupon[]>;
    marcarComoDevuelto(id: number): Promise<Cupon>;
}
