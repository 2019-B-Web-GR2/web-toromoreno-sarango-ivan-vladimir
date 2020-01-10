import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario/usuario.entity';
import {UsuarioModule} from './usuario/usuario.module';
import {UsuarioService} from "./usuario/usuario.service";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'default',
            type: 'mysql',
            host: '172.31.108.148',
            port: 32769,
            username: 'LazaMH',
            password: '1234',
            database: 'Prueba',
            dropSchema: false,
            entities: [
                UsuarioEntity,
            ],
            synchronize: true, //Con esto se crea en la base de datos
        }),
        UsuarioModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(
        // tslint:disable-next-line:variable-name
        private _usuarioService: UsuarioService,
    ) {
        console.log('Inicia');
        const usuarioPromesa = this._usuarioService.encontrarUno(1);
        usuarioPromesa
            .then(
                (data) => {
                    console.log('data', data);
                }
            )
            .catch(
                (error) => {
                    console.log('error',error);
                }
            );
        console.log('Termina');
    }
}
