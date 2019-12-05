import {Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('usuario_web')
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'id_web',
        comment: 'Identificador de la tabla usuario',
    })
    id: number;
}
