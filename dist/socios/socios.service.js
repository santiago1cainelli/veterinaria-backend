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
exports.SociosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const socio_entity_1 = require("./entities/socio.entity");
const orden_socio_enum_1 = require("../common/enums/orden-socio.enum");
const estado_socio_enum_1 = require("../common/enums/estado-socio.enum");
const configuracion_service_1 = require("../configuracion/configuracion.service");
const categoria_utils_1 = require("../common/utils/categoria.utils");
let SociosService = class SociosService {
    constructor(repo, configuracionService) {
        this.repo = repo;
        this.configuracionService = configuracionService;
    }
    async create(dto) {
        await this.assertDniYEmailDisponibles(dto.dni, dto.email);
        const fechaNacimiento = new Date(dto.fechaNacimiento);
        const fechaAlta = dto.fechaAlta ? new Date(dto.fechaAlta) : new Date();
        const categoria = await this.calcularCategoria(fechaNacimiento, fechaAlta);
        const socio = this.repo.create({
            ...dto,
            fechaNacimiento,
            fechaAlta,
            categoria,
            estado: estado_socio_enum_1.EstadoSocio.ACTIVO,
        });
        return this.repo.save(socio);
    }
    async findAll(query) {
        const qb = this.repo
            .createQueryBuilder('socio')
            .leftJoinAndSelect('socio.casillero', 'casillero')
            .leftJoinAndSelect('socio.grupoFamiliar', 'grupoFamiliar')
            .leftJoinAndSelect('socio.inscripciones', 'inscripciones')
            .leftJoinAndSelect('inscripciones.actividad', 'actividad');
        if (query.categoria)
            qb.andWhere('socio.categoria = :categoria', { categoria: query.categoria });
        if (query.zonaCobro !== undefined)
            qb.andWhere('socio.zonaCobro = :zona', { zona: query.zonaCobro });
        if (query.estado)
            qb.andWhere('socio.estado = :estado', { estado: query.estado });
        if (query.buscar) {
            qb.andWhere('(LOWER(socio.nombre) LIKE LOWER(:buscar) OR LOWER(socio.apellido) LIKE LOWER(:buscar) OR socio.dni LIKE :buscar)', { buscar: `%${query.buscar}%` });
        }
        this.aplicarOrden(qb, query.orden);
        return qb.getMany();
    }
    aplicarOrden(qb, orden) {
        switch (orden) {
            case orden_socio_enum_1.OrdenSocio.NUMERO:
                qb.orderBy('socio.id', 'ASC');
                break;
            case orden_socio_enum_1.OrdenSocio.ZONA:
                qb.orderBy('socio.zonaCobro', 'ASC').addOrderBy('socio.apellido', 'ASC');
                break;
            case orden_socio_enum_1.OrdenSocio.CATEGORIA:
                qb.orderBy('socio.categoria', 'ASC').addOrderBy('socio.apellido', 'ASC');
                break;
            case orden_socio_enum_1.OrdenSocio.ANTIGUEDAD:
                qb.orderBy('socio.fechaAlta', 'ASC');
                break;
            case orden_socio_enum_1.OrdenSocio.ALFABETICO:
            default:
                qb.orderBy('socio.apellido', 'ASC').addOrderBy('socio.nombre', 'ASC');
                break;
        }
    }
    async findOne(id) {
        const socio = await this.repo.findOne({
            where: { id },
            relations: [
                'casillero',
                'grupoFamiliar',
                'grupoFamiliar.integrantes',
                'inscripciones',
                'inscripciones.actividad',
                'cupones',
            ],
        });
        if (!socio) {
            throw new common_1.NotFoundException(`No existe un socio con id ${id}.`);
        }
        return socio;
    }
    async update(id, dto) {
        const socio = await this.findOne(id);
        if (dto.dni || dto.email) {
            await this.assertDniYEmailDisponibles(dto.dni ?? socio.dni, dto.email ?? socio.email, id);
        }
        Object.assign(socio, {
            ...dto,
            fechaNacimiento: dto.fechaNacimiento ? new Date(dto.fechaNacimiento) : socio.fechaNacimiento,
            fechaAlta: dto.fechaAlta ? new Date(dto.fechaAlta) : socio.fechaAlta,
        });
        socio.categoria = await this.calcularCategoria(socio.fechaNacimiento, socio.fechaAlta);
        return this.repo.save(socio);
    }
    async remove(id) {
        const socio = await this.findOne(id);
        socio.estado = estado_socio_enum_1.EstadoSocio.BAJA;
        await this.repo.save(socio);
        return { message: `El socio ${socio.apellido}, ${socio.nombre} fue dado de baja.` };
    }
    async recalcularCategoriasDeTodos() {
        const socios = await this.repo.find({ where: { estado: estado_socio_enum_1.EstadoSocio.ACTIVO } });
        const config = await this.configuracionService.getOrCreate();
        for (const socio of socios) {
            socio.categoria = (0, categoria_utils_1.calcularCategoriaSocial)(socio.fechaNacimiento, socio.fechaAlta, config);
        }
        await this.repo.save(socios);
    }
    async calcularCategoria(fechaNacimiento, fechaAlta) {
        const config = await this.configuracionService.getOrCreate();
        return (0, categoria_utils_1.calcularCategoriaSocial)(fechaNacimiento, fechaAlta, config);
    }
    async assertDniYEmailDisponibles(dni, email, ignorarId) {
        const existente = await this.repo
            .createQueryBuilder('socio')
            .where('(socio.dni = :dni OR socio.email = :email)', { dni, email })
            .andWhere(ignorarId ? 'socio.id != :ignorarId' : '1=1', { ignorarId })
            .getOne();
        if (existente) {
            if (existente.dni === dni) {
                throw new common_1.ConflictException(`Ya existe un socio con el DNI ${dni}.`);
            }
            throw new common_1.ConflictException(`Ya existe un socio con el correo ${email}.`);
        }
    }
    async findByIdOrFail(id) {
        return this.findOne(id);
    }
    async marcarMoroso(socio) {
        if (socio.estado !== estado_socio_enum_1.EstadoSocio.BAJA) {
            socio.estado = estado_socio_enum_1.EstadoSocio.MOROSO;
        }
        return this.repo.save(socio);
    }
    async suspender(socio) {
        socio.estado = estado_socio_enum_1.EstadoSocio.SUSPENDIDO;
        return this.repo.save(socio);
    }
    async reactivar(id) {
        const socio = await this.findOne(id);
        if (socio.estado === estado_socio_enum_1.EstadoSocio.BAJA) {
            throw new common_1.BadRequestException('No se puede reactivar a un socio dado de baja; debe darse de alta nuevamente.');
        }
        socio.estado = estado_socio_enum_1.EstadoSocio.ACTIVO;
        socio.mesesImpagosConsecutivos = 0;
        return this.repo.save(socio);
    }
    async save(socio) {
        return this.repo.save(socio);
    }
};
exports.SociosService = SociosService;
exports.SociosService = SociosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        configuracion_service_1.ConfiguracionService])
], SociosService);
//# sourceMappingURL=socios.service.js.map