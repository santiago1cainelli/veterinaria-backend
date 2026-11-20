"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasillerosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const casillero_entity_1 = require("./entities/casillero.entity");
const socio_entity_1 = require("../socios/entities/socio.entity");
const casilleros_service_1 = require("./casilleros.service");
const casilleros_controller_1 = require("./casilleros.controller");
const configuracion_module_1 = require("../configuracion/configuracion.module");
let CasillerosModule = class CasillerosModule {
};
exports.CasillerosModule = CasillerosModule;
exports.CasillerosModule = CasillerosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([casillero_entity_1.Casillero, socio_entity_1.Socio]), configuracion_module_1.ConfiguracionModule],
        controllers: [casilleros_controller_1.CasillerosController],
        providers: [casilleros_service_1.CasillerosService],
        exports: [casilleros_service_1.CasillerosService],
    })
], CasillerosModule);
//# sourceMappingURL=casilleros.module.js.map