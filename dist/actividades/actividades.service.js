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
exports.ActividadesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const actividad_entity_1 = require("./entities/actividad.entity");
const configuracion_service_1 = require("../configuracion/configuracion.service");
let ActividadesService = class ActividadesService {
    constructor(repo, configuracionService) {
        this.repo = repo;
        this.configuracionService = configuracionService;
    }
    async create(dto) {
        const config = await this.configuracionService.getOrCreate();
        const totalActuales = await this.repo.count();
        if (totalActuales >= config.totalActividades) {
            throw new common_1.BadRequestException(`El club tiene un máximo configurado de ${config.totalActividades} actividades deportivas.`);
        }
        const actividad = this.repo.create({
            ...dto,
            instructor: dto.instructorId ? { id: dto.instructorId } : null,
        });
        return this.repo.save(actividad);
    }
    findAll(soloActivas = false) {
        return this.repo.find({
            where: soloActivas ? { activa: true } : {},
            relations: ['instructor'],
            order: { turno: 'ASC', nombre: 'ASC' },
        });
    }
    async findOne(id) {
        const actividad = await this.repo.findOne({
            where: { id },
            relations: ['instructor', 'inscripciones', 'inscripciones.socio'],
        });
        if (!actividad) {
            throw new common_1.NotFoundException(`No existe una actividad con id ${id}.`);
        }
        return actividad;
    }
    async update(id, dto) {
        const actividad = await this.findOne(id);
        Object.assign(actividad, {
            ...dto,
            instructor: dto.instructorId ? { id: dto.instructorId } : actividad.instructor,
        });
        return this.repo.save(actividad);
    }
    async remove(id) {
        const actividad = await this.findOne(id);
        actividad.activa = false;
        await this.repo.save(actividad);
        return { message: `La actividad "${actividad.nombre}" fue dada de baja.` };
    }
    async listadoAsistencia() {
        return this.repo.find({
            relations: ['instructor', 'inscripciones', 'inscripciones.socio'],
            where: { activa: true },
            order: { turno: 'ASC', horaInicio: 'ASC', nombre: 'ASC' },
        });
    }
};
exports.ActividadesService = ActividadesService;
exports.ActividadesService = ActividadesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(actividad_entity_1.Actividad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        configuracion_service_1.ConfiguracionService])
], ActividadesService);
//# sourceMappingURL=actividades.service.js.map