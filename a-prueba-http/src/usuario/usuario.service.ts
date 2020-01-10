import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario.entity';
import {DeleteResult, LessThan, Like, MoreThan, Repository} from 'typeorm';

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
        where: any = {},
        skip: number = 0,
        take: number = 10,
        order: any = {
            id: 'DESC',
            nombre: 'ASC',
        },
    ): Promise<UsuarioEntity[]> {

        //Exactamente el nombre o exactamente la cédula
        const consultaWhere = [
            {
                nombre:  where,
            },
            {
                cedula: where,
            },
        ];

        // Exactamente el nombre o LIKE la cedula
        const consultaWhereLike = [
            {
                nombre: Like('a%'),
            },
            {
                cedula: Like('%a'),
            },
        ];

        //Id sea mayor a 20

        const consultaWhereMoreThan = {
            id: MoreThan(20),
        };

        const consultaWhereLessThan = {
            id: LessThan(20),
        };

        return this._repositorioUsuario
            .find({
                where: where,
                skip: skip,
                take: take,
                order: order,
            });
    }
}
