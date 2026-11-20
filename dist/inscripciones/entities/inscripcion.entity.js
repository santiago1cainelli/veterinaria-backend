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
exports.Inscripcion = void 0;
const typeorm_1 = require("typeorm");
const socio_entity_1 = require("../../socios/entities/socio.entity");
const actividad_entity_1 = require("../../actividades/entities/actividad.entity");
let Inscripcion = class Inscripcion {
};
exports.Inscripcion = Inscripcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inscripcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => socio_entity_1.Socio, (socio) => socio.inscripciones, { onDelete: 'CASCADE' }),
    __metadata("design:type", socio_entity_1.Socio)
], Inscripcion.prototype, "socio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => actividad_entity_1.Actividad, (actividad) => actividad.inscripciones, { onDelete: 'CASCADE' }),
    __metadata("design:type", actividad_entity_1.Actividad)
], Inscripcion.prototype, "actividad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Inscripcion.prototype, "activa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Inscripcion.prototype, "fechaInscripcion", void 0);
exports.Inscripcion = Inscripcion = __decorate([
    (0, typeorm_1.Entity)('inscripciones'),
    (0, typeorm_1.Unique)(['socio', 'actividad'])
], Inscripcion);
//# sourceMappingURL=inscripcion.entity.js.map