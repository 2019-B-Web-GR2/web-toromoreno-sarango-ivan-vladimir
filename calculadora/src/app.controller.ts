import { Controller, Get, Headers, Body, HttpCode, Post, Put, Query, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/suma')
  add(
    @Headers('n1') n1,
    @Headers('n2') n2,
  ): number {
    return this.appService.add(+n1, +n2);
  }

  @HttpCode(201)
  @Post('/resta')
  subs(
    @Body('n1') n1: number,
    @Body('n2') n2: number,
  ): number {
    return this.appService.sub(+n1, +n2);
  }

  @HttpCode(202)
  @Put('/multiplicacion')
  mult(
    @Query('n1') n1,
    @Query('n2') n2,
  ): number {
    return this.appService.mult(+n1, +n2);
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
  ): number {
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
    return this.appService.div(+n1, +n2);
  }

}
