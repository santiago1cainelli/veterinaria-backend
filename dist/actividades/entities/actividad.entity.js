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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actividad = void 0;
const typeorm_1 = require("typeorm");
const turno_enum_1 = require("../../common/enums/turno.enum");
const instructor_entity_1 = require("../../instructores/entities/instructor.entity");
const inscripcion_entity_1 = require("../../inscripciones/entities/inscripcion.entity");
let Actividad = class Actividad {
};
exports.Actividad = Actividad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Actividad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Actividad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Actividad.prototype, "arancel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: turno_enum_1.Turno }),
    __metadata("design:type", String)
], Actividad.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "diasSemana", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "horaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "horaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Actividad.prototype, "cupoMaximo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instructor_entity_1.Instructor, (instructor) => instructor.actividades, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Object)
], Actividad.prototype, "instructor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inscripcion_entity_1.Inscripcion, (inscripcion) => inscripcion.actividad),
    __metadata("design:type", Array)
], Actividad.prototype, "inscripciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Actividad.prototype, "activa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Actividad.prototype, "createdAt", void 0);
exports.Actividad = Actividad = __decorate([
    (0, typeorm_1.Entity)('actividades')
], Actividad);
//# sourceMappingURL=actividad.entity.js.map