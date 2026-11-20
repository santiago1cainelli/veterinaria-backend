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
exports.CreateRendicionDto = exports.DetalleCobranzaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DetalleCobranzaDto {
}
exports.DetalleCobranzaDto = DetalleCobranzaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id del cupón cobrado por el cobrador.' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DetalleCobranzaDto.prototype, "cuponId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Importe efectivamente cobrado (0 si no pagó, para armar la devolución).' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], DetalleCobranzaDto.prototype, "importeCobrado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DetalleCobranzaDto.prototype, "cobrado", void 0);
class CreateRendicionDto {
}
exports.CreateRendicionDto = CreateRendicionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateRendicionDto.prototype, "cobradorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-03' }),
    __metadata("design:type", String)
], CreateRendicionDto.prototype, "semanaInicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-08-09' }),
    __metadata("design:type", String)
], CreateRendicionDto.prototype, "semanaFin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DetalleCobranzaDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DetalleCobranzaDto),
    __metadata("design:type", Array)
], CreateRendicionDto.prototype, "detalles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: false,
        description: 'Marcar true si corresponde a la última semana del mes (dispara la devolución de cupones impagos).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRendicionDto.prototype, "esUltimaSemanaDelMes", void 0);
//# sourceMappingURL=create-rendicion.dto.js.map