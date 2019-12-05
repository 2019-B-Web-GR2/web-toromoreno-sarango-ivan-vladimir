import {Controller, Get, Headers, Body, HttpCode, Post, Put, Query, Delete} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {

    valor: number = 100;

    constructor(private readonly appService: AppService) {
    }

    @Get('/suma')
    add(
        @Headers('n1') n1,
        @Headers('n2') n2,
    ): string {
        let response: string = '';
        if (!this.validateValue()) {
            this.valor = 100;
            response = 'Puntos se reinician a 100\n';
        }
        this.valor -= this.appService.add(+n1, +n2);
        return response += this.appService.add(+n1, +n2);
    }

    @HttpCode(201)
    @Post('/resta')
    subs(
        @Body('n1') n1: number,
        @Body('n2') n2: number,
    ): string {
        let response: string = '';
        if (!this.validateValue()) {
            this.valor = 100;
            response = 'Puntos se reinician a 100\n';
        }
        this.valor += this.appService.add(+n1, +n2);
        return response += this.appService.sub(+n1, +n2);
    }

    @HttpCode(202)
    @Put('/multiplicacion')
    mult(
        @Query('n1') n1,
        @Query('n2') n2,
    ): string {
        let response: string = '';
        if (!this.validateValue()) {
            this.valor = 100;
            response = 'Puntos se reinician a 100\n';
        }
        this.valor -= this.appService.mult(+n1, +n2);
        return response += this.appService.mult(+n1, +n2);
    }

    @HttpCode(203)
    @Delete('/division')
    div(
        @Query('n1') n1q,
        @Query('n2') n2q,
        @Body('n1') n1b: number,
        @Body('n2') n2b: number,
        @Headers('n1') n1h,
        @Headers('n2') n2h,
    ): string {
        let response: string = '';
        if (!this.validateValue()) {
            this.valor = 100;
            response = 'Puntos se reinician a 100\n';
        }
        let n1 = 0
        let n2 = 0
        if (n1q) {
            n1 = +n1q
        } else if (n1b) {
            n1 = n1b
        } else {
            n1 = n1h
        }
        if (n2q) {
            n2 = +n2q
        } else if (n2b) {
            n2 = n2b
        } else {
            n2 = n2h
        }
        this.valor -= this.appService.div(+n1, +n2);
        return response += this.appService.div(+n1, +n2);
    }

    validateValue(): boolean {
        return this.valor > 0;
    }

}
