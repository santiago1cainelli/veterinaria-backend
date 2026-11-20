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
exports.InscripcionesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inscripciones_service_1 = require("./inscripciones.service");
const create_inscripcion_dto_1 = require("./dto/create-inscripcion.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
const roles_guard_1 = require("../common/guards/roles.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let InscripcionesController = class InscripcionesController {
    constructor(service) {
        this.service = service;
    }
    inscribir(dto, user) {
        if (user.role === role_enum_1.Role.SOCIO && user.socioId !== dto.socioId) {
            throw new common_1.ForbiddenException('Sólo puede inscribirse a sí mismo.');
        }
        return this.service.inscribir(dto);
    }
    darDeBaja(id) {
        return this.service.darDeBaja(id);
    }
    async darDeBajaPorSocioYActividad(socioId, actividadId) {
        const inscripcion = await this.service.findInscripcion(socioId, actividadId);
        if (!inscripcion) {
            return { message: 'Inscripción no encontrada' };
        }
        return this.service.darDeBaja(inscripcion.id);
    }
    buscar(actividadId, socioId, user) {
        if (user?.role === role_enum_1.Role.SOCIO && user.socioId) {
            return this.service.findPorSocio(user.socioId);
        }
        if (actividadId)
            return this.service.findPorActividad(Number(actividadId));
        if (socioId)
            return this.service.findPorSocio(Number(socioId));
        return [];
    }
};
exports.InscripcionesController = InscripcionesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SOCIO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inscripcion_dto_1.CreateInscripcionDto, Object]),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "inscribir", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SOCIO),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "darDeBaja", null);
__decorate([
    (0, common_1.Delete)('socio/:socioId/actividad/:actividadId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SOCIO),
    __param(0, (0, common_1.Param)('socioId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('actividadId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], InscripcionesController.prototype, "darDeBajaPorSocioYActividad", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.INSTRUCTOR, role_enum_1.Role.SOCIO),
    __param(0, (0, common_1.Query)('actividadId')),
    __param(1, (0, common_1.Query)('socioId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], InscripcionesController.prototype, "buscar", null);
exports.InscripcionesController = InscripcionesController = __decorate([
    (0, swagger_1.ApiTags)('Inscripciones a actividades'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)('inscripciones'),
    __metadata("design:paramtypes", [inscripciones_service_1.InscripcionesService])
], InscripcionesController);
//# sourceMappingURL=inscripciones.controller.js.map