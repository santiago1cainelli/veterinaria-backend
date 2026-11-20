"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CobradoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cobrador_entity_1 = require("./entities/cobrador.entity");
const cobradores_service_1 = require("./cobradores.service");
const cobradores_controller_1 = require("./cobradores.controller");
let CobradoresModule = class CobradoresModule {
};
exports.CobradoresModule = CobradoresModule;
exports.CobradoresModule = CobradoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cobrador_entity_1.Cobrador])],
        controllers: [cobradores_controller_1.CobradoresController],
        providers: [cobradores_service_1.CobradoresService],
        exports: [cobradores_service_1.CobradoresService],
    })
], CobradoresModule);
//# sourceMappingURL=cobradores.module.js.map