import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {MascotasEntity} from "../mascotas/mascotas.entity";

@Entity('usuario_web')
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'nombre',
        comment: 'nombre de la tabla usuario',
    })
    id: number;

    @Index({
        unique: false,
    })
    @Column(
        {
            type: 'varchar',
            name: 'nombre',
            nullable: true,
            comment: 'Nombre del usuario',
        })
    nombre?: string;

    @Index({
        unique: true,
    })
    @Column(
        {
            type: 'varchar',
            name: 'cedula',
            nullable: false,
            comment: 'Cédula del usuario',
        })
    cedula: string;

    @OneToMany(
        type => MascotasEntity,
        mascota => mascota.usuario,
    )
    mascotas: MascotasEntity[];
}
