"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt = __importStar(require("bcrypt"));
const data_source_1 = require("../data-source");
const configuracion_entity_1 = require("../../configuracion/entities/configuracion.entity");
const cobrador_entity_1 = require("../../cobradores/entities/cobrador.entity");
const casillero_entity_1 = require("../../casilleros/entities/casillero.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const role_enum_1 = require("../../common/enums/role.enum");
const zona_cobro_enum_1 = require("../../common/enums/zona-cobro.enum");
async function seed() {
    const dataSource = await data_source_1.AppDataSource.initialize();
    console.log('Conectado a la base de datos. Iniciando carga de datos iniciales...');
    const configRepo = dataSource.getRepository(configuracion_entity_1.Configuracion);
    const yaExisteConfig = await configRepo.findOne({ where: {} });
    if (!yaExisteConfig) {
        await configRepo.save(configRepo.create());
        console.log('✔ Configuración por defecto creada.');
    }
    const cobradoresRepo = dataSource.getRepository(cobrador_entity_1.Cobrador);
    const cobradoresSeed = [
        { nombre: 'Zona 1', apellido: 'Pérez', correo: 'perez.cobrador@elglobo.com.ar', zona: zona_cobro_enum_1.ZonaCobro.ZONA_1 },
        { nombre: 'Zona 2', apellido: 'García', correo: 'garcia.cobrador@elglobo.com.ar', zona: zona_cobro_enum_1.ZonaCobro.ZONA_2 },
        { nombre: 'Zona 3', apellido: 'Rodríguez', correo: 'rodriguez.cobrador@elglobo.com.ar', zona: zona_cobro_enum_1.ZonaCobro.ZONA_3 },
    ];
    for (const c of cobradoresSeed) {
        const existente = await cobradoresRepo.findOne({ where: { zona: c.zona } });
        if (!existente) {
            await cobradoresRepo.save(cobradoresRepo.create(c));
            console.log(`✔ Cobrador creado: Sr. ${c.apellido} (${c.zona}).`);
        }
    }
    const casillerosRepo = dataSource.getRepository(casillero_entity_1.Casillero);
    const totalCasilleros = await casillerosRepo.count();
    if (totalCasilleros === 0) {
        const casilleros = Array.from({ length: 100 }, (_, i) => casillerosRepo.create({ numero: i + 1, costoMensual: 2500 }));
        await casillerosRepo.save(casilleros);
        console.log('✔ 100 casilleros creados.');
    }
    const usersRepo = dataSource.getRepository(user_entity_1.User);
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@elglobo.com.ar';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';
    const existeAdmin = await usersRepo.findOne({ where: { email: adminEmail } });
    if (!existeAdmin) {
        await usersRepo.save(usersRepo.create({
            email: adminEmail,
            password: await bcrypt.hash(adminPassword, 10),
            role: role_enum_1.Role.ADMIN,
        }));
        console.log(`✔ Usuario administrador creado: ${adminEmail} / ${adminPassword}`);
    }
    else {
        console.log('… El usuario administrador ya existía, no se modificó.');
    }
    await dataSource.destroy();
    console.log('Carga de datos iniciales finalizada.');
}
seed().catch((error) => {
    console.error('Error al ejecutar el seed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map