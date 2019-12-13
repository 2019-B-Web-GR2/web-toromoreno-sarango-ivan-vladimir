import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario.entity';
import {DeleteResult, Repository} from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        // tslint:disable-next-line:variable-name
        private _repositorioUsuario: Repository<UsuarioEntity>,
    ) {
    }

    encontrarUno(id: number): Promise<UsuarioEntity | undefined> {
        return this._repositorioUsuario.findOne(id);
    }

    crearUno(usuario: UsuarioEntity): Promise<UsuarioEntity | undefined> {
        return this._repositorioUsuario.save(usuario);
    }

    borrarUno(id: number): Promise<DeleteResult> {
        return this._repositorioUsuario.delete(id);
    }

    actualizarUno(id: number, usuario: UsuarioEntity): Promise<UsuarioEntity> {
        usuario.id = id;
        return this._repositorioUsuario.save(usuario);
    }

    buscar(
        where: UsuarioEntity | UsuarioEntity[],
        skip: number = 0,
        take: number = 10,
    ) {
        this._repositorioUsuario.find({
            where: where,
            skip: skip,
            take: take,
        });
    }
}
