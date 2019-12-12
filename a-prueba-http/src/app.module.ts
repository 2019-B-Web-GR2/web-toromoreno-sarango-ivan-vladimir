import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario/usuario.entity';
import {UsuarioModule} from './usuario/usuario.module';

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
}
