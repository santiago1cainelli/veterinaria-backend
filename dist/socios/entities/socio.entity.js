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
exports.Socio = void 0;
const typeorm_1 = require("typeorm");
const categoria_social_enum_1 = require("../../common/enums/categoria-social.enum");
const zona_cobro_enum_1 = require("../../common/enums/zona-cobro.enum");
const estado_socio_enum_1 = require("../../common/enums/estado-socio.enum");
const rol_grupo_familiar_enum_1 = require("../../common/enums/rol-grupo-familiar.enum");
const grupo_familiar_entity_1 = require("../../grupos-familiares/entities/grupo-familiar.entity");
const casillero_entity_1 = require("../../casilleros/entities/casillero.entity");
const inscripcion_entity_1 = require("../../inscripciones/entities/inscripcion.entity");
const cupon_entity_1 = require("../../cupones/entities/cupon.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Socio = class Socio {
};
exports.Socio = Socio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Socio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Socio.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Socio.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 20 }),
    __metadata("design:type", String)
], Socio.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Socio.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Socio.prototype, "fechaAlta", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Socio.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Socio.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Socio.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Socio.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: categoria_social_enum_1.CategoriaSocial }),
    __metadata("design:type", String)
], Socio.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: zona_cobro_enum_1.ZonaCobro, default: zona_cobro_enum_1.ZonaCobro.ZONA_0 }),
    __metadata("design:type", Number)
], Socio.prototype, "zonaCobro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: estado_socio_enum_1.EstadoSocio, default: estado_socio_enum_1.EstadoSocio.ACTIVO }),
    __metadata("design:type", String)
], Socio.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Socio.prototype, "mesesImpagosConsecutivos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => grupo_familiar_entity_1.GrupoFamiliar, (grupo) => grupo.integrantes, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Object)
], Socio.prototype, "grupoFamiliar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: rol_grupo_familiar_enum_1.RolGrupoFamiliar, nullable: true }),
    __metadata("design:type", Object)
], Socio.prototype, "rolGrupoFamiliar", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => casillero_entity_1.Casillero, (casillero) => casillero.socio, { nullable: true }),
    __metadata("design:type", Object)
], Socio.prototype, "casillero", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inscripcion_entity_1.Inscripcion, (inscripcion) => inscripcion.socio),
    __metadata("design:type", Array)
], Socio.prototype, "inscripciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cupon_entity_1.Cupon, (cupon) => cupon.socio),
    __metadata("design:type", Array)
], Socio.prototype, "cupones", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.socio, { nullable: true }),
    __metadata("design:type", Object)
], Socio.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Socio.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Socio.prototype, "updatedAt", void 0);
exports.Socio = Socio = __decorate([
    (0, typeorm_1.Entity)('socios')
], Socio);
//# sourceMappingURL=socio.entity.js.map