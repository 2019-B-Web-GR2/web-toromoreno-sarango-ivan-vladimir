import {
    Body,
    Controller,
    Get,
    Head,
    Headers,
    HttpCode,
    InternalServerErrorException,
    Param,
    Post,
    Query, UploadedFile, UseInterceptors
} from '@nestjs/common';
import {AppService} from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";

// @ts-ignore
@Controller('pepito') // segemento url -> "/"
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('ciudades/:idCiudad')
    ciudades(
        @Param('idCiudad') idCiudad,
    ) {
        console.log(idCiudad);
        const ciudadPichincha = [
            {id: 1, nombre: 'Quito'},
            {id: 2, nombre: 'Machachi'},
            {id: 3, nombre: 'Cumbaya'},
            {id: 4, nombre: 'Sangolquí'},
        ];
        const ciudadGuayas = [
            {id: 1, nombre: 'Guayaquil'},
            {id: 2, nombre: 'Durán'},
        ];
        switch (idCiudad) {
            case '1':
                return ciudadPichincha;
            case '2':
                return ciudadGuayas;
        }
    }

    @Post('subir-archivo')
    @UseInterceptors(
        FileInterceptor('file',
            {
                limits: {
                    fieldSize: 10000,
                },
                dest: './archivos',
            }),
    )
    subirArchivo(@UploadedFile() file) {
        console.log(file);
    }

    @Get('hola-mundo') // -> url "hola mundo"
    getHello()
        :
        string {
        return this.appService.getHello();
    }

// http://localhost:4000/pepito/ POST
    @HttpCode(200)
    @Post()
    adiosMundo()
        :
        string {
        const segundos = this.obtenerSegundos();
        if (segundos % 2 === 0) {
            return 'Adios mundo!';
        } else {
            throw new InternalServerErrorException('Es impar');
        }
    }

    private

    obtenerSegundos()
        :
        number {
        return new Date().getSeconds();
    }

    @Get('bienvenida')
    bienvenida(
        @Query()
            parametrosDeConsulta: ObjetoBienvenida,
        @Query('nombre')
            nombreUsuario: string,
        @Query('numero')
            numeroUsuario: string,
        @Query('casado')
            casadoUsuario: string,
    ):
        string {
        console.log(parametrosDeConsulta);
        return `Mensaje ${parametrosDeConsulta.nombre} Numero: ${parametrosDeConsulta.numero}`;
    }

    @Get('inscripcion-curso/:idCurso/:cedula')
    inscripcionCurso(
        @Param()
            parametrosDeRuta: ObjetoInscripcion,
        @Param('idCurso')
            idCurso: string,
        @Param('cedula')
            cedula: string,
    ):
        string {
        console.log(parametrosDeRuta);
        return `Te inscribiste al curso: ${idCurso} <br> ${cedula}`;
    }

    @Post('almorzar')
    @HttpCode(200)
    almorzar(
        @Body()
            parametrosDeCuerpo: ObjetoAlmorzar,
    ):
        string {
        console.log(parametrosDeCuerpo);
        return `Tienes: ${parametrosDeCuerpo.hambre} hambre y ${parametrosDeCuerpo.dinero} dinero`;
    }

    @Get('obtener-cabeceras')
    obtenerCabeceras(
        @Headers()
            cabeceras,
        @Headers('numerouno')
            numeroUno,
    ) {
        console.log(cabeceras);
        return `Las cabeceras son: ${numeroUno}`;
    }
}

interface ObjetoBienvenida {
    nombre?: string;
    numero?: string;
    casado?: string;
}

interface ObjetoInscripcion {
    idCurso: string;
    cedula: string;
}

interface ObjetoAlmorzar {
    hambre: string;
    dinero: string;
}

