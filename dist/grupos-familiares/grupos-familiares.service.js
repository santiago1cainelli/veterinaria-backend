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
exports.GruposFamiliaresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const grupo_familiar_entity_1 = require("./entities/grupo-familiar.entity");
const socio_entity_1 = require("../socios/entities/socio.entity");
const rol_grupo_familiar_enum_1 = require("../common/enums/rol-grupo-familiar.enum");
const configuracion_service_1 = require("../configuracion/configuracion.service");
let GruposFamiliaresService = class GruposFamiliaresService {
    constructor(repo, sociosRepo, configuracionService) {
        this.repo = repo;
        this.sociosRepo = sociosRepo;
        this.configuracionService = configuracionService;
    }
    async create(dto) {
        const ids = [dto.titularId, dto.conyugeId, ...dto.hijosIds];
        const idsUnicos = new Set(ids);
        if (idsUnicos.size !== ids.length) {
            throw new common_1.BadRequestException('Un socio no puede figurar dos veces en el mismo grupo familiar.');
        }
        const socios = await this.sociosRepo.find({
            where: ids.map((id) => ({ id })),
            relations: ['grupoFamiliar'],
        });
        if (socios.length !== ids.length) {
            throw new common_1.NotFoundException('Alguno de los socios indicados no existe en el padrón.');
        }
        const yaAgrupado = socios.find((s) => s.grupoFamiliar !== null && s.grupoFamiliar !== undefined);
        if (yaAgrupado) {
            throw new common_1.BadRequestException(`El socio ${yaAgrupado.apellido}, ${yaAgrupado.nombre} ya pertenece a otro grupo familiar.`);
        }
        const config = await this.configuracionService.getOrCreate();
        const grupo = await this.repo.save(this.repo.create({ cuotaGrupal: dto.cuotaGrupal ?? config.cuotaGrupoFamiliar }));
        const asignarRol = (socio, rol) => {
            socio.grupoFamiliar = grupo;
            socio.rolGrupoFamiliar = rol;
        };
        const titular = socios.find((s) => s.id === dto.titularId);
        const conyuge = socios.find((s) => s.id === dto.conyugeId);
        asignarRol(titular, rol_grupo_familiar_enum_1.RolGrupoFamiliar.TITULAR);
        asignarRol(conyuge, rol_grupo_familiar_enum_1.RolGrupoFamiliar.CONYUGE);
        for (const hijoId of dto.hijosIds) {
            asignarRol(socios.find((s) => s.id === hijoId), rol_grupo_familiar_enum_1.RolGrupoFamiliar.HIJO);
        }
        await this.sociosRepo.save(socios);
        return this.findOne(grupo.id);
    }
    findAll() {
        return this.repo.find({ relations: ['integrantes'] });
    }
    async findOne(id) {
        const grupo = await this.repo.findOne({ where: { id }, relations: ['integrantes'] });
        if (!grupo) {
            throw new common_1.NotFoundException(`No existe un grupo familiar con id ${id}.`);
        }
        return grupo;
    }
    async quitarIntegrante(grupoId, socioId) {
        const grupo = await this.findOne(grupoId);
        const socio = grupo.integrantes.find((s) => s.id === socioId);
        if (!socio) {
            throw new common_1.NotFoundException('El socio indicado no pertenece a este grupo familiar.');
        }
        socio.grupoFamiliar = null;
        socio.rolGrupoFamiliar = null;
        await this.sociosRepo.save(socio);
        return this.findOne(grupoId);
    }
};
exports.GruposFamiliaresService = GruposFamiliaresService;
exports.GruposFamiliaresService = GruposFamiliaresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grupo_familiar_entity_1.GrupoFamiliar)),
    __param(1, (0, typeorm_1.InjectRepository)(socio_entity_1.Socio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        configuracion_service_1.ConfiguracionService])
], GruposFamiliaresService);
//# sourceMappingURL=grupos-familiares.service.js.map