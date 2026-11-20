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
var CuponesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuponesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cupon_entity_1 = require("./entities/cupon.entity");
const socio_entity_1 = require("../socios/entities/socio.entity");
const cobrador_entity_1 = require("../cobradores/entities/cobrador.entity");
const estado_cupon_enum_1 = require("../common/enums/estado-cupon.enum");
const estado_socio_enum_1 = require("../common/enums/estado-socio.enum");
const categoria_social_enum_1 = require("../common/enums/categoria-social.enum");
const zona_cobro_enum_1 = require("../common/enums/zona-cobro.enum");
const configuracion_service_1 = require("../configuracion/configuracion.service");
const date_utils_1 = require("../common/utils/date.utils");
let CuponesService = CuponesService_1 = class CuponesService {
    constructor(repo, sociosRepo, cobradoresRepo, configuracionService) {
        this.repo = repo;
        this.sociosRepo = sociosRepo;
        this.cobradoresRepo = cobradoresRepo;
        this.configuracionService = configuracionService;
        this.logger = new common_1.Logger(CuponesService_1.name);
    }
    async findAll(query) {
        const qb = this.repo
            .createQueryBuilder('cupon')
            .leftJoinAndSelect('cupon.socio', 'socio')
            .leftJoinAndSelect('cupon.cobrador', 'cobrador')
            .leftJoinAndSelect('cupon.grupoFamiliar', 'grupoFamiliar')
            .orderBy('cupon.fechaEmision', 'DESC');
        if (query.socioId)
            qb.andWhere('socio.id = :socioId', { socioId: query.socioId });
        if (query.cobradorId)
            qb.andWhere('cobrador.id = :cobradorId', { cobradorId: query.cobradorId });
        if (query.zona !== undefined)
            qb.andWhere('cupon.zona = :zona', { zona: query.zona });
        if (query.estado)
            qb.andWhere('cupon.estado = :estado', { estado: query.estado });
        if (query.periodo)
            qb.andWhere('cupon.periodo = :periodo', { periodo: query.periodo });
        return qb.getMany();
    }
    async findOne(id) {
        const cupon = await this.repo.findOne({
            where: { id },
            relations: ['socio', 'cobrador', 'grupoFamiliar'],
        });
        if (!cupon) {
            throw new common_1.NotFoundException(`No existe un cupón con id ${id}.`);
        }
        return cupon;
    }
    async pagar(id, dto) {
        const cupon = await this.findOne(id);
        if (cupon.estado === estado_cupon_enum_1.EstadoCupon.PAGADO) {
            throw new common_1.BadRequestException('El cupón ya se encuentra pagado.');
        }
        cupon.estado = estado_cupon_enum_1.EstadoCupon.PAGADO;
        cupon.fechaPago = dto.fechaPago ? new Date(dto.fechaPago) : new Date();
        await this.repo.save(cupon);
        const socio = await this.sociosRepo.findOne({ where: { id: cupon.socio.id } });
        if (socio) {
            socio.mesesImpagosConsecutivos = 0;
            if (socio.estado === estado_socio_enum_1.EstadoSocio.MOROSO || socio.estado === estado_socio_enum_1.EstadoSocio.SUSPENDIDO) {
                socio.estado = estado_socio_enum_1.EstadoSocio.ACTIVO;
            }
            await this.sociosRepo.save(socio);
        }
        return cupon;
    }
    async generarCuponesMensuales(periodo = date_utils_1.DateUtils.periodo()) {
        await this.aplicarControlDeMorosidad(periodo);
        const config = await this.configuracionService.getOrCreate();
        const socios = await this.sociosRepo.find({
            where: { estado: estado_socio_enum_1.EstadoSocio.ACTIVO },
            relations: ['grupoFamiliar', 'inscripciones', 'inscripciones.actividad', 'casillero'],
        });
        const yaEmitidos = await this.repo.find({ where: { periodo } });
        const socioIdsConCupon = new Set(yaEmitidos.map((c) => c.socio?.id).filter(Boolean));
        let generados = 0;
        const gruposYaFacturados = new Set();
        for (const socio of socios) {
            if (socioIdsConCupon.has(socio.id))
                continue;
            if (socio.grupoFamiliar) {
                if (gruposYaFacturados.has(socio.grupoFamiliar.id))
                    continue;
                gruposYaFacturados.add(socio.grupoFamiliar.id);
                const montoActividades = await this.sumarActividadesDelGrupo(socio.grupoFamiliar.id);
                const montoCasillero = await this.sumarCasillerosDelGrupo(socio.grupoFamiliar.id);
                const montoTotal = Number(socio.grupoFamiliar.cuotaGrupal) + montoActividades + montoCasillero;
                await this.repo.save(this.repo.create({
                    socio,
                    grupoFamiliar: socio.grupoFamiliar,
                    periodo,
                    zona: socio.zonaCobro,
                    cobrador: await this.cobradorDeZona(socio.zonaCobro),
                    montoCuotaSocial: socio.grupoFamiliar.cuotaGrupal,
                    montoActividades,
                    montoCasillero,
                    montoTotal,
                    detalle: 'Recibo único de Plan Grupo Familiar.',
                }));
                generados++;
                continue;
            }
            const montoCuotaSocial = this.montoCuotaPorCategoria(socio.categoria, config);
            const montoActividades = socio.inscripciones
                .filter((i) => i.activa)
                .reduce((acc, i) => acc + Number(i.actividad.arancel), 0);
            const montoCasillero = socio.casillero ? Number(socio.casillero.costoMensual) : 0;
            const montoTotal = montoCuotaSocial + montoActividades + montoCasillero;
            await this.repo.save(this.repo.create({
                socio,
                periodo,
                zona: socio.zonaCobro,
                cobrador: await this.cobradorDeZona(socio.zonaCobro),
                montoCuotaSocial,
                montoActividades,
                montoCasillero,
                montoTotal,
            }));
            generados++;
        }
        const reemitidos = await this.reemitirCuponesImpagosConRecargo(periodo, config.recargoMorosidad);
        return { generados, reemitidos, sociosSuspendidos: 0 };
    }
    async reemitirCuponesImpagosConRecargo(periodoActual, recargoPorcentaje) {
        const periodoAnterior = date_utils_1.DateUtils.periodoAnterior(periodoActual);
        const impagos = await this.repo.find({
            where: [
                { periodo: periodoAnterior, estado: estado_cupon_enum_1.EstadoCupon.PENDIENTE },
                { periodo: periodoAnterior, estado: estado_cupon_enum_1.EstadoCupon.DEVUELTO },
            ],
            relations: ['socio', 'cobrador', 'grupoFamiliar'],
        });
        let reemitidos = 0;
        for (const original of impagos) {
            if (original.socio.estado === estado_socio_enum_1.EstadoSocio.MOROSO || original.socio.estado === estado_socio_enum_1.EstadoSocio.SUSPENDIDO) {
                continue;
            }
            const yaReemitido = await this.repo.findOne({
                where: { socio: { id: original.socio.id }, periodo: periodoActual, esReemision: true },
            });
            if (yaReemitido)
                continue;
            const montoConRecargo = Number(original.montoTotal) * (1 + recargoPorcentaje / 100);
            await this.repo.save(this.repo.create({
                socio: original.socio,
                grupoFamiliar: original.grupoFamiliar,
                periodo: periodoActual,
                zona: original.zona,
                cobrador: original.cobrador,
                montoCuotaSocial: original.montoCuotaSocial,
                montoActividades: original.montoActividades,
                montoCasillero: original.montoCasillero,
                recargoPorcentaje: recargoPorcentaje,
                montoTotal: montoConRecargo,
                esReemision: true,
                detalle: `Reemisión del período ${periodoAnterior} impago, con recargo del ${recargoPorcentaje}%.`,
            }));
            reemitidos++;
        }
        return reemitidos;
    }
    async aplicarControlDeMorosidad(periodoNuevo) {
        const config = await this.configuracionService.getOrCreate();
        const periodoAnterior = date_utils_1.DateUtils.periodoAnterior(periodoNuevo);
        const cuponesAnteriores = await this.repo.find({
            where: { periodo: periodoAnterior },
            relations: ['socio'],
        });
        const cuponesPorSocio = new Map();
        for (const c of cuponesAnteriores) {
            if (!c.socio?.id)
                continue;
            const lista = cuponesPorSocio.get(c.socio.id) ?? [];
            lista.push(c);
            cuponesPorSocio.set(c.socio.id, lista);
        }
        for (const [socioId, cupones] of cuponesPorSocio.entries()) {
            const socio = await this.sociosRepo.findOne({ where: { id: socioId } });
            if (!socio || socio.estado === estado_socio_enum_1.EstadoSocio.BAJA)
                continue;
            const tieneImpago = cupones.some((c) => c.estado === estado_cupon_enum_1.EstadoCupon.PENDIENTE || c.estado === estado_cupon_enum_1.EstadoCupon.DEVUELTO);
            if (tieneImpago) {
                socio.mesesImpagosConsecutivos += 1;
                if (socio.mesesImpagosConsecutivos >= config.mesesConsecutivosParaMorosidad) {
                    socio.estado = estado_socio_enum_1.EstadoSocio.SUSPENDIDO;
                    this.logger.warn(`Socio #${socio.id} (${socio.apellido}, ${socio.nombre}) declarado moroso y suspendido ` +
                        `por ${socio.mesesImpagosConsecutivos} meses consecutivos impagos.`);
                }
                else {
                    socio.estado = estado_socio_enum_1.EstadoSocio.MOROSO;
                }
            }
            else {
                socio.mesesImpagosConsecutivos = 0;
                if (socio.estado === estado_socio_enum_1.EstadoSocio.MOROSO || socio.estado === estado_socio_enum_1.EstadoSocio.SUSPENDIDO) {
                    socio.estado = estado_socio_enum_1.EstadoSocio.ACTIVO;
                }
            }
            await this.sociosRepo.save(socio);
        }
    }
    montoCuotaPorCategoria(categoria, config) {
        switch (categoria) {
            case categoria_social_enum_1.CategoriaSocial.CADETE:
                return Number(config.cuotaCadete);
            case categoria_social_enum_1.CategoriaSocial.VITALICIO:
                return Number(config.cuotaVitalicio);
            case categoria_social_enum_1.CategoriaSocial.ACTIVO:
            default:
                return Number(config.cuotaActivo);
        }
    }
    async cobradorDeZona(zona) {
        if (zona === zona_cobro_enum_1.ZonaCobro.ZONA_0)
            return null;
        return this.cobradoresRepo.findOne({ where: { zona } });
    }
    async sumarActividadesDelGrupo(grupoId) {
        const integrantes = await this.sociosRepo.find({
            where: { grupoFamiliar: { id: grupoId } },
            relations: ['inscripciones', 'inscripciones.actividad'],
        });
        return integrantes.reduce((acc, s) => acc + s.inscripciones.filter((i) => i.activa).reduce((a, i) => a + Number(i.actividad.arancel), 0), 0);
    }
    async sumarCasillerosDelGrupo(grupoId) {
        const integrantes = await this.sociosRepo.find({
            where: { grupoFamiliar: { id: grupoId } },
            relations: ['casillero'],
        });
        return integrantes.reduce((acc, s) => acc + (s.casillero ? Number(s.casillero.costoMensual) : 0), 0);
    }
    async findPendientesPorCobrador(cobradorId) {
        return this.repo.find({
            where: { cobrador: { id: cobradorId }, estado: estado_cupon_enum_1.EstadoCupon.PENDIENTE },
            relations: ['socio'],
        });
    }
    async marcarComoDevuelto(id) {
        const cupon = await this.findOne(id);
        cupon.estado = estado_cupon_enum_1.EstadoCupon.DEVUELTO;
        return this.repo.save(cupon);
    }
};
exports.CuponesService = CuponesService;
exports.CuponesService = CuponesService = CuponesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cupon_entity_1.Cupon)),
    __param(1, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __param(2, (0, typeorm_1.InjectRepository)(cobrador_entity_1.Cobrador)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        configuracion_service_1.ConfiguracionService])
], CuponesService);
//# sourceMappingURL=cupones.service.js.map