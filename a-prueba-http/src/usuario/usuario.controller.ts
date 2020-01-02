import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult} from "typeorm";
import * as Joi from '@hapi/joi';
import {UsuarioCreateDto} from "./usuario.create-dto";
import {validate} from "class-validator";

@Controller('usuario')
export class UsuarioController {

    constructor(
        // tslint:disable-next-line:variable-name
        private readonly _usuarioService: UsuarioService,
    ) {
    }

    //Get /model/:id
    @Get(':id')
    obtenerUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity> {
        return this._usuarioService
            .encontrarUno(Number(identificador));
    }

    @Post()
    async crearUsuario(
        @Body() usuario: UsuarioEntity,
    ): Promise<UsuarioEntity> {
        const usuarioCreateDTO = new UsuarioCreateDto();
        usuarioCreateDTO.nombre = usuario.nombre;
        usuarioCreateDTO.cedula = usuario.cedula;
        const errores = await validate(usuarioCreateDTO);
        if (errores.length > 0) {
            throw new BadRequestException('Error validando');
        } else {
            return this._usuarioService
                .crearUno(
                    usuario
                );
        }
        return this._usuarioService
            .crearUno(usuario);
    }

    @Put()
    actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
    ) {
        return this._usuarioService
            .actualizarUno(
                +id,
                usuario,
            );
    }

    @Delete()
    eliminarUno(
        @Param('id') id: string,
    ): Promise<DeleteResult> {
        return this._usuarioService
            .borrarUno(
                +id,
            );
    }

    @Get()
    async buscar(
        @Query('skip') skip?: string | number,
        @Query('take') take?: string | number,
        @Query('where') where?: string,
        @Query('order') order?: string,
    ): Promise<UsuarioEntity[]> {
        const nuevoEsquema = Joi.object({
            skip: Joi.number(),
        });
        try {
            const objetoValidado = await nuevoEsquema
                .validateAsync({
                    skip: skip,
                });
            console.log('objetoValidado', objetoValidado);
        } catch (err) {
            console.error('Error', err);
        }

        if (skip) {
            skip = +skip;
        }
        if (take) {
            take = +take;
        }
        if (where) {
            try {
                where = JSON.parse(where);
            } catch (e) {
                where = undefined;
            }
        }
        if (order) {
            try {
                order = JSON.parse(order);
            } catch (e) {
                order = undefined;
            }
        }
        return this._usuarioService.buscar(
            where,
            skip as number,
            take as number,
            order,
        );
    }
}
