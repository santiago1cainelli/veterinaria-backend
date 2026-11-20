"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructoresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const instructor_entity_1 = require("./entities/instructor.entity");
const instructores_service_1 = require("./instructores.service");
const instructores_controller_1 = require("./instructores.controller");
let InstructoresModule = class InstructoresModule {
};
exports.InstructoresModule = InstructoresModule;
exports.InstructoresModule = InstructoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([instructor_entity_1.Instructor])],
        controllers: [instructores_controller_1.InstructoresController],
        providers: [instructores_service_1.InstructoresService],
        exports: [instructores_service_1.InstructoresService],
    })
], InstructoresModule);
//# sourceMappingURL=instructores.module.js.map