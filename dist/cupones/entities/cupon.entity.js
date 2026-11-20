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
exports.Cupon = void 0;
const typeorm_1 = require("typeorm");
const zona_cobro_enum_1 = require("../../common/enums/zona-cobro.enum");
const estado_cupon_enum_1 = require("../../common/enums/estado-cupon.enum");
const socio_entity_1 = require("../../socios/entities/socio.entity");
const cobrador_entity_1 = require("../../cobradores/entities/cobrador.entity");
const grupo_familiar_entity_1 = require("../../grupos-familiares/entities/grupo-familiar.entity");
let Cupon = class Cupon {
};
exports.Cupon = Cupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => socio_entity_1.Socio, (socio) => socio.cupones, { onDelete: 'CASCADE' }),
    __metadata("design:type", socio_entity_1.Socio)
], Cupon.prototype, "socio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => grupo_familiar_entity_1.GrupoFamiliar, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", Object)
], Cupon.prototype, "grupoFamiliar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cupon.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: zona_cobro_enum_1.ZonaCobro }),
    __metadata("design:type", Number)
], Cupon.prototype, "zona", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cobrador_entity_1.Cobrador, (cobrador) => cobrador.cupones, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Object)
], Cupon.prototype, "cobrador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Cupon.prototype, "montoCuotaSocial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cupon.prototype, "montoActividades", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cupon.prototype, "montoCasillero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Cupon.prototype, "recargoPorcentaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Cupon.prototype, "montoTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: estado_cupon_enum_1.EstadoCupon, default: estado_cupon_enum_1.EstadoCupon.PENDIENTE }),
    __metadata("design:type", String)
], Cupon.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Cupon.prototype, "esReemision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cupon.prototype, "detalle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Cupon.prototype, "fechaPago", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cupon.prototype, "fechaEmision", void 0);
exports.Cupon = Cupon = __decorate([
    (0, typeorm_1.Entity)('cupones')
], Cupon);
//# sourceMappingURL=cupon.entity.js.map