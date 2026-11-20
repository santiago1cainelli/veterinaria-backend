"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendicionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rendicion_entity_1 = require("./entities/rendicion.entity");
const rendicion_detalle_entity_1 = require("./entities/rendicion-detalle.entity");
const cobrador_entity_1 = require("../cobradores/entities/cobrador.entity");
const cupon_entity_1 = require("../cupones/entities/cupon.entity");
const socio_entity_1 = require("../socios/entities/socio.entity");
const rendiciones_service_1 = require("./rendiciones.service");
const rendiciones_controller_1 = require("./rendiciones.controller");
let RendicionesModule = class RendicionesModule {
};
exports.RendicionesModule = RendicionesModule;
exports.RendicionesModule = RendicionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rendicion_entity_1.Rendicion, rendicion_detalle_entity_1.RendicionDetalle, cobrador_entity_1.Cobrador, cupon_entity_1.Cupon, socio_entity_1.Socio])],
        controllers: [rendiciones_controller_1.RendicionesController],
        providers: [rendiciones_service_1.RendicionesService],
        exports: [rendiciones_service_1.RendicionesService],
    })
], RendicionesModule);
//# sourceMappingURL=rendiciones.module.js.map