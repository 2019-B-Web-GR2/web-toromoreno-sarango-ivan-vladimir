import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, Req, Res,
    Session,
    UnauthorizedException
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult} from "typeorm";
import * as Joi from '@hapi/joi';
import {UsuarioCreateDto} from "./usuario.create-dto";
import {validate} from "class-validator";
import {UsuarioUpdateDto} from "./usuario.update-dto";
import {ok} from "assert";

@Controller('usuario')
export class UsuarioController {

    //Adm -> Crea, actualiza y elimina
    //Sup -> actualiza

    constructor(
        // tslint:disable-next-line:variable-name
        private readonly _usuarioService: UsuarioService,
    ) {
    }

    @Get('ruta/login')
    async rutaAutenticar(
        @Res() res,
    ) {
        res.render(
            'login/login',
        );
    }

    @Get('ruta/mostrar-usuarios')
    async rutaMostrarUsuarios(
        @Res() res,
        @Query('error') error: string,
        @Query('exito') exito: string
    ) {
        const usuarios = await this._usuarioService.buscar();
        res.render(
            'usuario/rutas/buscar-mostrar-usuario',
            {
                datos: {
                    usuarios,
                    exito,
                    error,
                },
            },
        );
    }

    @Get('ruta/editar-usuario/:idUsuario')
    async rutaEditarUsuario(
        @Query('error') error: string,
        @Param('idUsuario') idUsuario: string,
        @Res() res,
    ) {
        const consulta = {
            where: {
                id: idUsuario,
            },
        }
        const arregloUsuarios = await this._usuarioService.buscar(consulta);
        res.render(
            'usuario/rutas/crear-usuario',
            {
                datos: {
                    error,
                    usuario: arregloUsuarios[0],
                },
                },
        )
        ;
    }

    @Get('ruta/crear-usuario')
    rutaCrearUsuarios(
        @Query('error') error: string,
        @Res() res,
    ) {
        res.render(
            'usuario/rutas/crear-usuario',
            {datos: {error}},
        )
        ;
    }

    @Get('ejemploejs')
    ejemploejs(
        @Res() res,
    ) {
        res.render('ejemplo', {
            datos: {
                nombre: 'Adrian',
                suma: this.suma,
                joi: Joi
            },
        });
    }

    suma(numUno, numDos) {
        return numUno + numDos;
    }

    @Get('logout')
    logout(
        @Session() session,
        @Req()req,
    ) {
        session.usuario = undefined;
        req.session.destroy();
        return 'Deslogueado';
    }

    @Get('hola')
    hola(
        @Session() session,
    ): string {
        let roles: string = `<ul>`;
        if (session.usuario) {
            session.usuario.roles.forEach(rol => {
                roles += `<li> ${rol} </li>`;
            });
        }
        roles += `</ul>`;
        return `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                         <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>EPN</title>
</head>
<body>
  <h1>Mi primera página web ${
            session.usuario ? session.usuario.nombre : ''
        }</h1>
</body>
</html>
` + roles;
    }


    @Get('sesion')
    sesion(
        @Session() session,
    ) {
        return session;
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
        @Session() session,
        @Res() res,
    ): Promise<void> {
        const isAdm = session.usuario.roles.find(rol => {
            return rol === 'Administrador';
        });
        if (!isAdm) {
            throw new UnauthorizedException('Error', 'No cuenta con permisos para realizar la acción');
        }
        const usuarioCreateDTO = new UsuarioCreateDto();
        usuarioCreateDTO.nombre = usuario.nombre;
        usuarioCreateDTO.cedula = usuario.cedula;
        const errores = await validate(usuarioCreateDTO);
        if (errores.length > 0) {
            res.redirect('/usuario/ruta/crear-usuario?error= Error validando');
            throw new BadRequestException('Error validando');
        } else {
            try {
                this._usuarioService
                    .crearUno(
                        usuario,
                    );
                res.redirect('/usuario/ruta/mostrar-usuarios?exito=Usuario creado correctamente');
            } catch (error) {
                res.redirect('/usuario/ruta/crear-usuario?error= Error con el servidor');
            }
        }
    }

    @Put()
    async actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
        @Session() session,
    ) {
        const isAdm = session.usuario.roles.find(rol => {
            return (rol === 'Administrador' || rol === 'Supervisor');
        });
        const usuarioUpdateDTO = new UsuarioUpdateDto();
        usuarioUpdateDTO.nombre = usuario.nombre;
        usuarioUpdateDTO.cedula = usuario.cedula;
        usuarioUpdateDTO.id = +id;
        const errores = await validate(usuarioUpdateDTO);
        if (errores.length > 0) {
            throw new BadRequestException('Error validando');
        } else {
            return this._usuarioService
                .actualizarUno(
                    +id,
                    usuario,
                );
        }
    }

    @Post()
    async eliminarUnoPost(
        @Param('id') id: string,
        @Session() session,
        @Res() res,
    ): Promise<void> {
        const isAdm = session.usuario.roles.find(rol => {
            return rol === 'Administrador';
        });
        if (!isAdm) {
            res.redirect(`usuario/ruta/mostrar-usuarios?error=No centa con permisos para realizar la acción`);
        }
        try {
            await this._usuarioService
                .borrarUno(
                    +id,
                );
            res.redirect(`usuario/ruta/mostrar-usuarios?exito=Usuario con ID: ${id} eliminado`);
        } catch (e) {
            res.redirect(`usuario/ruta/mostrar-usuarios?error=Error del servidor`);
        }
    }

    @Delete()
    eliminarUno(
        @Param('id') id: string,
        @Session() session,
    ): Promise<DeleteResult> {
        const isAdm = session.usuario.roles.find(rol => {
            return rol === 'Administrador';
        });
        if (!isAdm) {
            throw new UnauthorizedException('Error', 'No cuenta con permisos para realizar la acción');
        }
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

    @Post('login')
    login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Session() session,
    ) {
        console.log('Session', session);
        if (username === 'adrian' && password === '1234') {
            session.usuario = {
                nombre: 'Adrian',
                userId: 1,
                roles: ['Administrador'],
            };
            return 'ok';
        } else if (username === 'vicente' && password === '1234') {
            session.usuario = {
                nombre: 'Vicente',
                userId: 2,
                roles: ['Supervisor'],
            };
            return 'ok';
        }
        throw new BadRequestException('Error', 'Error autenticando');
    }
}
