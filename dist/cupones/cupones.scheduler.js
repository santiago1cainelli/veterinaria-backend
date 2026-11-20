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
var CuponesScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuponesScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cupones_service_1 = require("./cupones.service");
const socios_service_1 = require("../socios/socios.service");
let CuponesScheduler = CuponesScheduler_1 = class CuponesScheduler {
    constructor(cuponesService, sociosService) {
        this.cuponesService = cuponesService;
        this.sociosService = sociosService;
        this.logger = new common_1.Logger(CuponesScheduler_1.name);
    }
    async emisionMensual() {
        this.logger.log('Iniciando proceso mensual de categorización y emisión de cupones...');
        await this.sociosService.recalcularCategoriasDeTodos();
        const resultado = await this.cuponesService.generarCuponesMensuales();
        this.logger.log(`Proceso mensual finalizado. Cupones nuevos: ${resultado.generados}, reemitidos con recargo: ${resultado.reemitidos}.`);
    }
};
exports.CuponesScheduler = CuponesScheduler;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CuponesScheduler.prototype, "emisionMensual", null);
exports.CuponesScheduler = CuponesScheduler = CuponesScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cupones_service_1.CuponesService,
        socios_service_1.SociosService])
], CuponesScheduler);
//# sourceMappingURL=cupones.scheduler.js.map