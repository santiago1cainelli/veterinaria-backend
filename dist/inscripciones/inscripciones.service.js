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
exports.InscripcionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inscripcion_entity_1 = require("./entities/inscripcion.entity");
const socio_entity_1 = require("../socios/entities/socio.entity");
const actividad_entity_1 = require("../actividades/entities/actividad.entity");
const estado_socio_enum_1 = require("../common/enums/estado-socio.enum");
let InscripcionesService = class InscripcionesService {
    constructor(repo, sociosRepo, actividadesRepo) {
        this.repo = repo;
        this.sociosRepo = sociosRepo;
        this.actividadesRepo = actividadesRepo;
    }
    async inscribir(dto) {
        const socio = await this.sociosRepo.findOne({ where: { id: dto.socioId } });
        if (!socio)
            throw new common_1.NotFoundException(`No existe un socio con id ${dto.socioId}.`);
        if (socio.estado === estado_socio_enum_1.EstadoSocio.SUSPENDIDO || socio.estado === estado_socio_enum_1.EstadoSocio.BAJA) {
            throw new common_1.BadRequestException('El socio no puede inscribirse en actividades: está suspendido o dado de baja.');
        }
        const actividad = await this.actividadesRepo.findOne({
            where: { id: dto.actividadId },
            relations: ['inscripciones'],
        });
        if (!actividad)
            throw new common_1.NotFoundException(`No existe una actividad con id ${dto.actividadId}.`);
        if (!actividad.activa)
            throw new common_1.BadRequestException('La actividad no se encuentra disponible.');
        const existente = await this.repo.findOne({
            where: { socio: { id: dto.socioId }, actividad: { id: dto.actividadId } },
        });
        if (existente) {
            throw new common_1.ConflictException('El socio ya está inscripto en esa actividad.');
        }
        if (actividad.cupoMaximo) {
            const inscriptosActivos = actividad.inscripciones.filter((i) => i.activa).length;
            if (inscriptosActivos >= actividad.cupoMaximo) {
                throw new common_1.BadRequestException('La actividad alcanzó su cupo máximo de inscriptos.');
            }
        }
        const inscripcion = this.repo.create({ socio, actividad });
        return this.repo.save(inscripcion);
    }
    async darDeBaja(id) {
        const inscripcion = await this.repo.findOne({
            where: { id },
            relations: ['socio', 'actividad'],
        });
        if (!inscripcion) {
            throw new common_1.NotFoundException(`No existe una inscripción con id ${id}.`);
        }
        await this.repo.remove(inscripcion);
        return {
            message: `${inscripcion.socio.apellido}, ${inscripcion.socio.nombre} fue dado de baja de "${inscripcion.actividad.nombre}".`,
        };
    }
    findPorActividad(actividadId) {
        return this.repo.find({
            where: { actividad: { id: actividadId }, activa: true },
            relations: ['socio'],
            order: { socio: { apellido: 'ASC' } },
        });
    }
    findPorSocio(socioId) {
        return this.repo.find({
            where: { socio: { id: socioId } },
            relations: ['actividad'],
        });
    }
    findInscripcion(socioId, actividadId) {
        return this.repo.findOne({
            where: { socio: { id: socioId }, actividad: { id: actividadId } },
        });
    }
};
exports.InscripcionesService = InscripcionesService;
exports.InscripcionesService = InscripcionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inscripcion_entity_1.Inscripcion)),
    __param(1, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __param(2, (0, typeorm_1.InjectRepository)(actividad_entity_1.Actividad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InscripcionesService);
//# sourceMappingURL=inscripciones.service.js.map