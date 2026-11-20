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
exports.CobradoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cobrador_entity_1 = require("./entities/cobrador.entity");
const zona_cobro_enum_1 = require("../common/enums/zona-cobro.enum");
let CobradoresService = class CobradoresService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        if (dto.zona === zona_cobro_enum_1.ZonaCobro.ZONA_0) {
            throw new common_1.BadRequestException('La Zona 0 corresponde a pagos en el club y no tiene cobrador asignado.');
        }
        const existenteZona = await this.repo.findOne({ where: { zona: dto.zona } });
        if (existenteZona) {
            throw new common_1.ConflictException(`La zona ${dto.zona} ya tiene un cobrador asignado.`);
        }
        const existenteCorreo = await this.repo.findOne({ where: { correo: dto.correo } });
        if (existenteCorreo) {
            throw new common_1.ConflictException(`Ya existe un cobrador con el correo ${dto.correo}.`);
        }
        return this.repo.save(this.repo.create(dto));
    }
    findAll() {
        return this.repo.find({ order: { zona: 'ASC' } });
    }
    async findOne(id) {
        const cobrador = await this.repo.findOne({ where: { id } });
        if (!cobrador) {
            throw new common_1.NotFoundException(`No existe un cobrador con id ${id}.`);
        }
        return cobrador;
    }
    async update(id, dto) {
        const cobrador = await this.findOne(id);
        Object.assign(cobrador, dto);
        return this.repo.save(cobrador);
    }
    async remove(id) {
        const cobrador = await this.findOne(id);
        await this.repo.remove(cobrador);
        return { message: `El cobrador ${cobrador.apellido}, ${cobrador.nombre} fue eliminado.` };
    }
};
exports.CobradoresService = CobradoresService;
exports.CobradoresService = CobradoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cobrador_entity_1.Cobrador)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CobradoresService);
//# sourceMappingURL=cobradores.service.js.map