import {Module} from '@nestjs/common';
import {UsuarioService} from './usuario.service';
import {UsuarioController} from './usuario.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario.entity';

@Module({
    controllers: [
        UsuarioController,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        UsuarioService,
    ],
    imports: [
        TypeOrmModule.forFeature([
            UsuarioEntity,
        ])],
})
export class UsuarioModule {
}
