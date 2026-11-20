"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscripcionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inscripcion_entity_1 = require("./entities/inscripcion.entity");
const socio_entity_1 = require("../socios/entities/socio.entity");
const actividad_entity_1 = require("../actividades/entities/actividad.entity");
const inscripciones_service_1 = require("./inscripciones.service");
const inscripciones_controller_1 = require("./inscripciones.controller");
let InscripcionesModule = class InscripcionesModule {
};
exports.InscripcionesModule = InscripcionesModule;
exports.InscripcionesModule = InscripcionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inscripcion_entity_1.Inscripcion, socio_entity_1.Socio, actividad_entity_1.Actividad])],
        controllers: [inscripciones_controller_1.InscripcionesController],
        providers: [inscripciones_service_1.InscripcionesService],
        exports: [inscripciones_service_1.InscripcionesService],
    })
], InscripcionesModule);
//# sourceMappingURL=inscripciones.module.js.map