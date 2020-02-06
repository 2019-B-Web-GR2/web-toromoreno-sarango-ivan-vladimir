import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MascotasEntity} from './mascotas.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [MascotasEntity],
        ),
    ],
})

export class MascotasModule {
}