import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario/usuario.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 32821,
        username: 'root',
        password: '1234',
        database: 'web',
        entities: [
            UsuarioEntity,
        ],
        synchronize: true, //Con esto se crea en la base de datos
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
