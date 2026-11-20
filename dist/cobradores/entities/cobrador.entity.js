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
exports.Cobrador = void 0;
const typeorm_1 = require("typeorm");
const zona_cobro_enum_1 = require("../../common/enums/zona-cobro.enum");
const cupon_entity_1 = require("../../cupones/entities/cupon.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Cobrador = class Cobrador {
};
exports.Cobrador = Cobrador;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cobrador.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cobrador.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cobrador.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Cobrador.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: zona_cobro_enum_1.ZonaCobro }),
    __metadata("design:type", Number)
], Cobrador.prototype, "zona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 10 }),
    __metadata("design:type", Number)
], Cobrador.prototype, "comisionPorcentaje", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cupon_entity_1.Cupon, (cupon) => cupon.cobrador),
    __metadata("design:type", Array)
], Cobrador.prototype, "cupones", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.cobrador, { nullable: true }),
    __metadata("design:type", Object)
], Cobrador.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cobrador.prototype, "createdAt", void 0);
exports.Cobrador = Cobrador = __decorate([
    (0, typeorm_1.Entity)('cobradores')
], Cobrador);
//# sourceMappingURL=cobrador.entity.js.map