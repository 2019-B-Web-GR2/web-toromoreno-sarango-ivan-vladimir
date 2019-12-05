import { Body, Controller, Get, Head, Headers, HttpCode, InternalServerErrorException, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

// @ts-ignore
@Controller('pepito') // segemento url -> "/"
export class AppController {
  constructor(private readonly appService: AppService) {
  } // http://localhost:4000/pepito/ GET
  @Get('hola-mundo') // -> url "hola mundo"
  getHello(): string {
    return this.appService.getHello();
  }

  // http://localhost:4000/pepito/ POST
  @HttpCode(200)
  @Post()
  adiosMundo(): string {
    const segundos = this.obtenerSegundos();
    if (segundos % 2 === 0) {
      return 'Adios mundo!';
    } else {
      throw new InternalServerErrorException('Es impar');
    }
  }

  private obtenerSegundos(): number {
    return new Date().getSeconds();
  }

  @Get('bienvenida')
  public bienvenida(
      @Query() parametrosDeConsulta: ObjetoBienvenida,
      @Query('nombre') nombreUsuario: string,
      @Query('numero') numeroUsuario: string,
      @Query('casado') casadoUsuario: string,
  ): string {
    console.log(parametrosDeConsulta);
    return `Mensaje ${parametrosDeConsulta.nombre} Numero: ${parametrosDeConsulta.numero}`;
  }

  @Get('inscripcion-curso/:idCurso/:cedula')
  public inscripcionCurso(
      @Param() parametrosDeRuta: ObjetoInscripcion,
      @Param('idCurso') idCurso: string,
      @Param('cedula') cedula: string,
  ): string {
    console.log(parametrosDeRuta);
    return `Te inscribiste al curso: ${idCurso} <br> ${cedula}`;
  }

  @Post('almorzar')
  @HttpCode(200)
  public almorzar(
      @Body() parametrosDeCuerpo: ObjetoAlmorzar,
  ): string {
    console.log(parametrosDeCuerpo);
    return `Tienes: ${parametrosDeCuerpo.hambre} hambre y ${parametrosDeCuerpo.dinero} dinero`;
  }

  @Get('obtener-cabeceras')
  obtenerCabeceras(
      @Headers() cabeceras,
      @Headers('numerouno') numeroUno,
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

