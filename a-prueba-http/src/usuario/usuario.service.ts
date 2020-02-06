import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {UsuarioEntity} from './usuario.entity';

@Injectable()
export class UsuarioService {
    // @ts-ignore
    constructor(
        @InjectRepository(UsuarioEntity) // inyectar dpendencias
        // tslint:disable-next-line:variable-name
        private _repositorioUsuario: Repository <UsuarioEntity>,
    ) {
    }
    encontrarUno(id: number): Promise<UsuarioEntity | undefined> {
            // tslint:disable-next-line:no-console
        console.log('Empeso');
        const usuario = this._repositorioUsuario.findOne(id);
        return usuario;
    }
    borrarUno(id: number): Promise<DeleteResult> {
        // tslint:disable-next-line:no-unused-expression
        return this._repositorioUsuario.delete(id);
    }
    actualizarUno(id: number
    ,             usuario: UsuarioEntity,
    ): Promise<UsuarioEntity | undefined> {
        // tslint:disable-next-line:no-unused-expression
        usuario.id = id;
        return this._repositorioUsuario.save(usuario);
    }
    buscar() {
        this._repositorioUsuario.find({
            where: [{
                nombre: 'Roger',
            } , {
                nombre: 'Laza',
        },
        ],
            skip: 0,
            take: 10,
        });
    }
}
