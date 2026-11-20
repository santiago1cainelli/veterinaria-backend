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
exports.RendicionDetalle = void 0;
const typeorm_1 = require("typeorm");
const rendicion_entity_1 = require("./rendicion.entity");
const cupon_entity_1 = require("../../cupones/entities/cupon.entity");
let RendicionDetalle = class RendicionDetalle {
};
exports.RendicionDetalle = RendicionDetalle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RendicionDetalle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rendicion_entity_1.Rendicion, (rendicion) => rendicion.detalles, { onDelete: 'CASCADE' }),
    __metadata("design:type", rendicion_entity_1.Rendicion)
], RendicionDetalle.prototype, "rendicion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cupon_entity_1.Cupon, { onDelete: 'CASCADE' }),
    __metadata("design:type", cupon_entity_1.Cupon)
], RendicionDetalle.prototype, "cupon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RendicionDetalle.prototype, "importeCobrado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RendicionDetalle.prototype, "cobrado", void 0);
exports.RendicionDetalle = RendicionDetalle = __decorate([
    (0, typeorm_1.Entity)('rendicion_detalles')
], RendicionDetalle);
//# sourceMappingURL=rendicion-detalle.entity.js.map