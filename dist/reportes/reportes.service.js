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
exports.ReportesService = void 0;
const common_1 = require("@nestjs/common");
const socios_service_1 = require("../socios/socios.service");
const actividades_service_1 = require("../actividades/actividades.service");
const casilleros_service_1 = require("../casilleros/casilleros.service");
let ReportesService = class ReportesService {
    constructor(sociosService, actividadesService, casillerosService) {
        this.sociosService = sociosService;
        this.actividadesService = actividadesService;
        this.casillerosService = casillerosService;
    }
    listadoSocios(query) {
        return this.sociosService.findAll(query);
    }
    listadoAsistenciaPorActividad() {
        return this.actividadesService.listadoAsistencia();
    }
    listadoCasilleros(query) {
        return this.casillerosService.findAll(query);
    }
};
exports.ReportesService = ReportesService;
exports.ReportesService = ReportesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socios_service_1.SociosService,
        actividades_service_1.ActividadesService,
        casilleros_service_1.CasillerosService])
], ReportesService);
//# sourceMappingURL=reportes.service.js.map