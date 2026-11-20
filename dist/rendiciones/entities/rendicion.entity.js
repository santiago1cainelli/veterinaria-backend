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
exports.Rendicion = void 0;
const typeorm_1 = require("typeorm");
const cobrador_entity_1 = require("../../cobradores/entities/cobrador.entity");
const rendicion_detalle_entity_1 = require("./rendicion-detalle.entity");
let Rendicion = class Rendicion {
};
exports.Rendicion = Rendicion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rendicion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cobrador_entity_1.Cobrador, { onDelete: 'CASCADE' }),
    __metadata("design:type", cobrador_entity_1.Cobrador)
], Rendicion.prototype, "cobrador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Rendicion.prototype, "semanaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Rendicion.prototype, "semanaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Rendicion.prototype, "montoRecaudado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Rendicion.prototype, "comisionCalculada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Rendicion.prototype, "montoNeto", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Rendicion.prototype, "esUltimaSemanaDelMes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rendicion_detalle_entity_1.RendicionDetalle, (detalle) => detalle.rendicion, { cascade: true }),
    __metadata("design:type", Array)
], Rendicion.prototype, "detalles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rendicion.prototype, "fechaRendicion", void 0);
exports.Rendicion = Rendicion = __decorate([
    (0, typeorm_1.Entity)('rendiciones')
], Rendicion);
//# sourceMappingURL=rendicion.entity.js.map