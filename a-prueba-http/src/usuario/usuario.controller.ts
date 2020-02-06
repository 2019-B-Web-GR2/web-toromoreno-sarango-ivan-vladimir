import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')
export class UsuarioController {
    constructor(
        // tslint:disable-next-line:variable-name
        private readonly _usuarioService: UsuarioService,
    ) {
    }
    @Get(':id')
    hola(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined> {
        return this._usuarioService.encontrarUno(Number(identificador));
    }
    @Post()
    crearUsuario(
        @Body() usuario: UsuarioEntity,
    ) {
        return this._usuarioService.crearUno(usuario);
    }
}
