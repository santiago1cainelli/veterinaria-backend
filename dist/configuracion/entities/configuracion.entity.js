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
exports.Configuracion = void 0;
const typeorm_1 = require("typeorm");
let Configuracion = class Configuracion {
};
exports.Configuracion = Configuracion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Configuracion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 35000 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "cuotaCadete", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 50000 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "cuotaActivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "cuotaVitalicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 80000 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "cuotaGrupoFamiliar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 2500 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "costoCasillero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 5 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "recargoMorosidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 10 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "comisionCobrador", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 18 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "edadMinimaActivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 60 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "edadMinimaVitalicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 30 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "antiguedadMinimaVitalicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "mesesConsecutivosParaMorosidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 100 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "totalCasilleros", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 20 }),
    __metadata("design:type", Number)
], Configuracion.prototype, "totalActividades", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Configuracion.prototype, "updatedAt", void 0);
exports.Configuracion = Configuracion = __decorate([
    (0, typeorm_1.Entity)('configuracion')
], Configuracion);
//# sourceMappingURL=configuracion.entity.js.map