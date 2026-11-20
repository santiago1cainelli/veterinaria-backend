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
exports.RendicionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rendicion_entity_1 = require("./entities/rendicion.entity");
const rendicion_detalle_entity_1 = require("./entities/rendicion-detalle.entity");
const cobrador_entity_1 = require("../cobradores/entities/cobrador.entity");
const cupon_entity_1 = require("../cupones/entities/cupon.entity");
const socio_entity_1 = require("../socios/entities/socio.entity");
const estado_cupon_enum_1 = require("../common/enums/estado-cupon.enum");
const estado_socio_enum_1 = require("../common/enums/estado-socio.enum");
let RendicionesService = class RendicionesService {
    constructor(repo, cobradoresRepo, cuponesRepo, sociosRepo, dataSource) {
        this.repo = repo;
        this.cobradoresRepo = cobradoresRepo;
        this.cuponesRepo = cuponesRepo;
        this.sociosRepo = sociosRepo;
        this.dataSource = dataSource;
    }
    async create(dto) {
        return this.dataSource.transaction(async (manager) => {
            const cobrador = await manager.findOne(cobrador_entity_1.Cobrador, { where: { id: dto.cobradorId } });
            if (!cobrador) {
                throw new common_1.NotFoundException(`No existe un cobrador con id ${dto.cobradorId}.`);
            }
            const detalles = [];
            let montoRecaudado = 0;
            for (const item of dto.detalles) {
                const cupon = await manager.findOne(cupon_entity_1.Cupon, {
                    where: { id: item.cuponId },
                    relations: ['cobrador', 'socio'],
                });
                if (!cupon) {
                    throw new common_1.NotFoundException(`No existe un cupón con id ${item.cuponId}.`);
                }
                if (cupon.cobrador?.id !== dto.cobradorId) {
                    throw new common_1.BadRequestException(`El cupón ${cupon.id} no pertenece a la zona de este cobrador.`);
                }
                const cobrado = item.cobrado ?? item.importeCobrado > 0;
                if (cobrado) {
                    cupon.estado = estado_cupon_enum_1.EstadoCupon.PAGADO;
                    cupon.fechaPago = new Date();
                    montoRecaudado += item.importeCobrado;
                    if (cupon.socio) {
                        const socio = await manager.findOne(socio_entity_1.Socio, { where: { id: cupon.socio.id } });
                        if (socio) {
                            socio.mesesImpagosConsecutivos = 0;
                            if (socio.estado === estado_socio_enum_1.EstadoSocio.MOROSO || socio.estado === estado_socio_enum_1.EstadoSocio.SUSPENDIDO) {
                                socio.estado = estado_socio_enum_1.EstadoSocio.ACTIVO;
                            }
                            await manager.save(socio);
                        }
                    }
                }
                else if (dto.esUltimaSemanaDelMes) {
                    cupon.estado = estado_cupon_enum_1.EstadoCupon.DEVUELTO;
                }
                await manager.save(cupon);
                const detalle = new rendicion_detalle_entity_1.RendicionDetalle();
                detalle.cupon = cupon;
                detalle.importeCobrado = item.importeCobrado;
                detalle.cobrado = cobrado;
                detalles.push(detalle);
            }
            const comisionCalculada = montoRecaudado * (Number(cobrador.comisionPorcentaje) / 100);
            const montoNeto = montoRecaudado - comisionCalculada;
            const rendicion = manager.create(rendicion_entity_1.Rendicion, {
                cobrador,
                semanaInicio: new Date(dto.semanaInicio),
                semanaFin: new Date(dto.semanaFin),
                montoRecaudado,
                comisionCalculada,
                montoNeto,
                esUltimaSemanaDelMes: dto.esUltimaSemanaDelMes ?? false,
                detalles,
            });
            return manager.save(rendicion);
        });
    }
    findAll(cobradorId) {
        return this.repo.find({
            where: cobradorId ? { cobrador: { id: cobradorId } } : {},
            relations: ['cobrador', 'detalles', 'detalles.cupon', 'detalles.cupon.socio'],
            order: { fechaRendicion: 'DESC' },
        });
    }
    async findOne(id) {
        const rendicion = await this.repo.findOne({
            where: { id },
            relations: ['cobrador', 'detalles', 'detalles.cupon', 'detalles.cupon.socio'],
        });
        if (!rendicion) {
            throw new common_1.NotFoundException(`No existe una rendición con id ${id}.`);
        }
        return rendicion;
    }
};
exports.RendicionesService = RendicionesService;
exports.RendicionesService = RendicionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rendicion_entity_1.Rendicion)),
    __param(1, (0, typeorm_1.InjectRepository)(cobrador_entity_1.Cobrador)),
    __param(2, (0, typeorm_1.InjectRepository)(cupon_entity_1.Cupon)),
    __param(3, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], RendicionesService);
//# sourceMappingURL=rendiciones.service.js.map