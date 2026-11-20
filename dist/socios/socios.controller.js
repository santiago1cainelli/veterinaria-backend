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
exports.SociosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const socios_service_1 = require("./socios.service");
const create_socio_dto_1 = require("./dto/create-socio.dto");
const update_socio_dto_1 = require("./dto/update-socio.dto");
const query_socio_dto_1 = require("./dto/query-socio.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const roles_guard_1 = require("../common/guards/roles.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let SociosController = class SociosController {
    constructor(sociosService) {
        this.sociosService = sociosService;
    }
    create(dto) {
        return this.sociosService.create(dto);
    }
    findAll(query) {
        return this.sociosService.findAll(query);
    }
    findMe(user) {
        return this.sociosService.findOne(user.socioId);
    }
    findOne(id, user) {
        this.assertPropioSocioOAdmin(id, user);
        return this.sociosService.findOne(id);
    }
    update(id, dto, user) {
        this.assertPropioSocioOAdmin(id, user);
        return this.sociosService.update(id, dto);
    }
    remove(id, user) {
        this.assertPropioSocioOAdmin(id, user);
        return this.sociosService.remove(id);
    }
    reactivar(id) {
        return this.sociosService.reactivar(id);
    }
    assertPropioSocioOAdmin(id, user) {
        if (user.role === role_enum_1.Role.SOCIO && user.socioId !== id) {
            throw new common_1.ForbiddenException('Sólo puede operar sobre sus propios datos.');
        }
    }
};
exports.SociosController = SociosController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_socio_dto_1.CreateSocioDto]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.COBRADOR, role_enum_1.Role.INSTRUCTOR),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_socio_dto_1.QuerySocioDto]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.SOCIO),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "findMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.COBRADOR, role_enum_1.Role.INSTRUCTOR, role_enum_1.Role.SOCIO),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SOCIO),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_socio_dto_1.UpdateSocioDto, Object]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SOCIO),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/reactivar'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SociosController.prototype, "reactivar", null);
exports.SociosController = SociosController = __decorate([
    (0, swagger_1.ApiTags)('Socios'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)('socios'),
    __metadata("design:paramtypes", [socios_service_1.SociosService])
], SociosController);
//# sourceMappingURL=socios.controller.js.map