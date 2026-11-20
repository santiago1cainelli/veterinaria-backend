"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCobradorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cobrador_dto_1 = require("./create-cobrador.dto");
class UpdateCobradorDto extends (0, swagger_1.PartialType)(create_cobrador_dto_1.CreateCobradorDto) {
}
exports.UpdateCobradorDto = UpdateCobradorDto;
//# sourceMappingURL=update-cobrador.dto.js.map