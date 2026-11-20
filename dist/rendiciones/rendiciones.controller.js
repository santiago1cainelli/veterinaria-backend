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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendicionesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rendiciones_service_1 = require("./rendiciones.service");
const create_rendicion_dto_1 = require("./dto/create-rendicion.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const roles_guard_1 = require("../common/guards/roles.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let RendicionesController = class RendicionesController {
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        if (user.role === role_enum_1.Role.COBRADOR && user.cobradorId !== dto.cobradorId) {
            throw new common_1.ForbiddenException('Sólo puede presentar rendiciones de su propia zona.');
        }
        return this.service.create(dto);
    }
    findAll(cobradorId, user) {
        const id = user.role === role_enum_1.Role.COBRADOR ? user.cobradorId : cobradorId ? Number(cobradorId) : undefined;
        return this.service.findAll(id);
    }
    async findOne(id, user) {
        const rendicion = await this.service.findOne(id);
        if (user.role === role_enum_1.Role.COBRADOR && rendicion.cobrador.id !== user.cobradorId) {
            throw new common_1.ForbiddenException('Sólo puede consultar sus propias rendiciones.');
        }
        return rendicion;
    }
    async update(id) {
        return this.service.findOne(id);
    }
};
exports.RendicionesController = RendicionesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.COBRADOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rendicion_dto_1.CreateRendicionDto, Object]),
    __metadata("design:returntype", void 0)
], RendicionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.COBRADOR),
    __param(0, (0, common_1.Query)('cobradorId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RendicionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.COBRADOR),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RendicionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RendicionesController.prototype, "update", null);
exports.RendicionesController = RendicionesController = __decorate([
    (0, swagger_1.ApiTags)('Rendiciones de cobradores'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)('rendiciones'),
    __metadata("design:paramtypes", [rendiciones_service_1.RendicionesService])
], RendicionesController);
//# sourceMappingURL=rendiciones.controller.js.map