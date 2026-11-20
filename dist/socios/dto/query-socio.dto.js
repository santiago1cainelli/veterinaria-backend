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
exports.QuerySocioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const orden_socio_enum_1 = require("../../common/enums/orden-socio.enum");
const categoria_social_enum_1 = require("../../common/enums/categoria-social.enum");
const zona_cobro_enum_1 = require("../../common/enums/zona-cobro.enum");
const estado_socio_enum_1 = require("../../common/enums/estado-socio.enum");
class QuerySocioDto {
}
exports.QuerySocioDto = QuerySocioDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: orden_socio_enum_1.OrdenSocio, default: orden_socio_enum_1.OrdenSocio.ALFABETICO }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(orden_socio_enum_1.OrdenSocio),
    __metadata("design:type", String)
], QuerySocioDto.prototype, "orden", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: categoria_social_enum_1.CategoriaSocial }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(categoria_social_enum_1.CategoriaSocial),
    __metadata("design:type", String)
], QuerySocioDto.prototype, "categoria", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: zona_cobro_enum_1.ZonaCobro }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(zona_cobro_enum_1.ZonaCobro),
    __metadata("design:type", Number)
], QuerySocioDto.prototype, "zonaCobro", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: estado_socio_enum_1.EstadoSocio }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(estado_socio_enum_1.EstadoSocio),
    __metadata("design:type", String)
], QuerySocioDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Búsqueda libre por nombre, apellido o DNI' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuerySocioDto.prototype, "buscar", void 0);
//# sourceMappingURL=query-socio.dto.js.map