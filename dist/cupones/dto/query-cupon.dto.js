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
exports.QueryCuponDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const estado_cupon_enum_1 = require("../../common/enums/estado-cupon.enum");
const zona_cobro_enum_1 = require("../../common/enums/zona-cobro.enum");
class QueryCuponDto {
}
exports.QueryCuponDto = QueryCuponDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], QueryCuponDto.prototype, "socioId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], QueryCuponDto.prototype, "cobradorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: zona_cobro_enum_1.ZonaCobro }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(zona_cobro_enum_1.ZonaCobro),
    __metadata("design:type", Number)
], QueryCuponDto.prototype, "zona", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: estado_cupon_enum_1.EstadoCupon }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(estado_cupon_enum_1.EstadoCupon),
    __metadata("design:type", String)
], QueryCuponDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-08' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryCuponDto.prototype, "periodo", void 0);
//# sourceMappingURL=query-cupon.dto.js.map