import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  add(number1: number, number2: number): number {
    return number1 + number2;
  }
  sub(number1: number, number2: number): number {
    return number1 - number2;
  }
  mult(number1: number, number2: number): number {
    return number1 * number2;
  }
  div(number1: number, number2: number): number {
    return number1 / number2;
  }
}
