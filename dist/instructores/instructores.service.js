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
exports.InstructoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const instructor_entity_1 = require("./entities/instructor.entity");
let InstructoresService = class InstructoresService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const existente = await this.repo.findOne({ where: { email: dto.email } });
        if (existente) {
            throw new common_1.ConflictException(`Ya existe un instructor con el correo ${dto.email}.`);
        }
        return this.repo.save(this.repo.create(dto));
    }
    findAll() {
        return this.repo.find({ relations: ['actividades'], order: { apellido: 'ASC' } });
    }
    async findOne(id) {
        const instructor = await this.repo.findOne({ where: { id }, relations: ['actividades'] });
        if (!instructor) {
            throw new common_1.NotFoundException(`No existe un instructor con id ${id}.`);
        }
        return instructor;
    }
    async update(id, dto) {
        const instructor = await this.findOne(id);
        Object.assign(instructor, dto);
        return this.repo.save(instructor);
    }
    async remove(id) {
        const instructor = await this.findOne(id);
        await this.repo.remove(instructor);
        return { message: `El instructor ${instructor.apellido}, ${instructor.nombre} fue eliminado.` };
    }
};
exports.InstructoresService = InstructoresService;
exports.InstructoresService = InstructoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(instructor_entity_1.Instructor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InstructoresService);
//# sourceMappingURL=instructores.service.js.map