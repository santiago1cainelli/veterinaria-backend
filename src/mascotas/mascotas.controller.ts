import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('mascotas')
@UseGuards(AuthGuard, RolesGuard)
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) { }
  @Post()
  // 1. ¡Le decimos a Nest que atrape un archivo llamado 'foto'!
  @UseInterceptors(
    FileInterceptor('foto', {
      // 2. Configuramos dónde y cómo se va a guardar en el disco duro
      storage: diskStorage({
        destination: './uploads/mascotas', // Carpetas en la raíz de tu proyecto
        filename: (req, file, callback) => {
          // Generamos un nombre único: "mascota-432423423.png" para que no se sobrescriban
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `mascota-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() createMascotaDto: CreateMascotaDto,
    @UploadedFile() file: Express.Multer.File, // <-- ¡Aquí llega el archivo físico guardado!
  ) {
    // Si el usuario subió una foto, le guardamos SOLO el nombre del archivo en el DTO
    if (file) {
      createMascotaDto.foto = file.filename;
    }
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  findAll() {
    // Cualquier usuario logueado (cliente, veterinario o admin) puede ver la lista
    return 'Lista de todas las mascotas';
  }
  @Delete(':id')
  @Roles('admin', 'veterinario') // ¡Etiqueta mágica! Solo ellos pasan
  remove(@Param('id') id: string) {
    return `Mascota #${id} eliminada con éxito`;
  }
}