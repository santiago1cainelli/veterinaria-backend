import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('clientes') // <-- Le dice a TypeORM que esta clase representa a la tabla 'clientes' de tu SQL
export class Cliente {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({ length: 50 })
    nombre: string;
    @Column({ length: 50 })
    apellido: string;
    @Column({ length: 10 })
    documento: string;
    @Column({ length: 50 })
    direccion: string;
    @Column({ length: 50 })
    localidad: string;
    @Column({ length: 50 })
    telefono: string;
    @Column({ length: 50 })
    foto: string;
    @Column({ length: 50 })
    email: string;
    @Column({ length: 50 })
    usuario: string;
}