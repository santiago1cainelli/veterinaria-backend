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
exports.CreateGrupoFamiliarDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateGrupoFamiliarDto {
}
exports.CreateGrupoFamiliarDto = CreateGrupoFamiliarDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id del socio titular (uno de los cónyuges).' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateGrupoFamiliarDto.prototype, "titularId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id del socio cónyuge.' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateGrupoFamiliarDto.prototype, "conyugeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number], description: 'Ids de los socios hijos (mínimo 1).' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreateGrupoFamiliarDto.prototype, "hijosIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Por defecto se usa la cuota configurada ($80.000).' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateGrupoFamiliarDto.prototype, "cuotaGrupal", void 0);
//# sourceMappingURL=create-grupo-familiar.dto.js.map