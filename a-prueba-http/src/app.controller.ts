import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}




//Typescript

var nombre: string = "Adrian"; //No recomendable utilizar
let apellido = "Adrian"; //Mutable
const cedula = "1718..."; //Inmutable

const casado: boolean = false;
const casado: number = 5;
const casado: number = 3.13;

if(casado === false) {
  
}
