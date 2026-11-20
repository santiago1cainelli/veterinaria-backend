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
exports.Casillero = void 0;
const typeorm_1 = require("typeorm");
const socio_entity_1 = require("../../socios/entities/socio.entity");
let Casillero = class Casillero {
};
exports.Casillero = Casillero;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Casillero.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Casillero.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => socio_entity_1.Socio, (socio) => socio.casillero, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Casillero.prototype, "socio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 2500 }),
    __metadata("design:type", Number)
], Casillero.prototype, "costoMensual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Casillero.prototype, "fechaAlquiler", void 0);
exports.Casillero = Casillero = __decorate([
    (0, typeorm_1.Entity)('casilleros')
], Casillero);
//# sourceMappingURL=casillero.entity.js.map