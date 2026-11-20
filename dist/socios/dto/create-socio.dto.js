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
exports.CreateSocioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const zona_cobro_enum_1 = require("../../common/enums/zona-cobro.enum");
class CreateSocioDto {
}
exports.CreateSocioDto = CreateSocioDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(7, 20),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2005-03-14' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-10', required: false, description: 'Por defecto, hoy.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "fechaAlta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "localidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSocioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: zona_cobro_enum_1.ZonaCobro, default: zona_cobro_enum_1.ZonaCobro.ZONA_0 }),
    (0, class_validator_1.IsEnum)(zona_cobro_enum_1.ZonaCobro),
    __metadata("design:type", Number)
], CreateSocioDto.prototype, "zonaCobro", void 0);
//# sourceMappingURL=create-socio.dto.js.map