"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasillerosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const casillero_entity_1 = require("./entities/casillero.entity");
const orden_casillero_enum_1 = require("../common/enums/orden-casillero.enum");
const socio_entity_1 = require("../socios/entities/socio.entity");
const configuracion_service_1 = require("../configuracion/configuracion.service");
let CasillerosService = class CasillerosService {
    constructor(repo, sociosRepo, configuracionService) {
        this.repo = repo;
        this.sociosRepo = sociosRepo;
        this.configuracionService = configuracionService;
    }
    async create(dto) {
        const config = await this.configuracionService.getOrCreate();
        const total = await this.repo.count();
        if (total >= config.totalCasilleros) {
            throw new common_1.BadRequestException(`El club dispone de un total de ${config.totalCasilleros} casilleros.`);
        }
        const existente = await this.repo.findOne({ where: { numero: dto.numero } });
        if (existente) {
            throw new common_1.ConflictException(`Ya existe el casillero número ${dto.numero}.`);
        }
        return this.repo.save(this.repo.create({ numero: dto.numero, costoMensual: dto.costoMensual ?? config.costoCasillero }));
    }
    async findAll(query) {
        const qb = this.repo.createQueryBuilder('casillero').leftJoinAndSelect('casillero.socio', 'socio');
        if (query.orden === orden_casillero_enum_1.OrdenCasillero.ALFABETICO) {
            qb.orderBy('CASE WHEN socio.id IS NULL THEN 1 ELSE 0 END', 'ASC')
                .addOrderBy('socio.apellido', 'ASC')
                .addOrderBy('socio.nombre', 'ASC');
        }
        else {
            qb.orderBy('casillero.numero', 'ASC');
        }
        return qb.getMany();
    }
    async findOne(id) {
        const casillero = await this.repo.findOne({ where: { id }, relations: ['socio'] });
        if (!casillero) {
            throw new common_1.NotFoundException(`No existe un casillero con id ${id}.`);
        }
        return casillero;
    }
    async alquilar(casilleroId, socioId) {
        const casillero = await this.findOne(casilleroId);
        if (casillero.socio) {
            throw new common_1.ConflictException(`El casillero ${casillero.numero} ya está alquilado.`);
        }
        const socioConCasillero = await this.repo.findOne({ where: { socio: { id: socioId } } });
        if (socioConCasillero) {
            throw new common_1.ConflictException('El socio ya tiene un casillero alquilado.');
        }
        const socio = await this.sociosRepo.findOne({ where: { id: socioId } });
        if (!socio) {
            throw new common_1.NotFoundException(`No existe un socio con id ${socioId}.`);
        }
        casillero.socio = socio;
        casillero.fechaAlquiler = new Date();
        return this.repo.save(casillero);
    }
    async liberar(casilleroId) {
        const casillero = await this.findOne(casilleroId);
        casillero.socio = null;
        casillero.fechaAlquiler = null;
        return this.repo.save(casillero);
    }
};
exports.CasillerosService = CasillerosService;
exports.CasillerosService = CasillerosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(casillero_entity_1.Casillero)),
    __param(1, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        configuracion_service_1.ConfiguracionService])
], CasillerosService);
//# sourceMappingURL=casilleros.service.js.map