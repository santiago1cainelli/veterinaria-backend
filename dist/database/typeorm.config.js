"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypeOrmConfig = void 0;
const buildTypeOrmConfig = (config) => ({
    type: 'mysql',
    host: config.get('database.host'),
    port: config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name'),
    autoLoadEntities: true,
    synchronize: config.get('env') !== 'production',
    logging: config.get('env') === 'development' ? ['error', 'warn'] : ['error'],
});
exports.buildTypeOrmConfig = buildTypeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map