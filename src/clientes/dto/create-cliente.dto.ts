import { IsString, Length, IsNotEmpty } from 'class-validator';
export class CreateClienteDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
    nombre!: string;
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    apellido!: string;
    @IsString()
    @IsNotEmpty()
    @Length(7, 10, { message: 'El documento debe tener entre 7 y 10 dígitos' })
    documento!: string;
    @IsString()
    @IsNotEmpty()
    direccion!: string;
}