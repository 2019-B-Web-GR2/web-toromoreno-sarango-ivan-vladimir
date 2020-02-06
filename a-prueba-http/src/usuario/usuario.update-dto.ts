import {IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

export class UsuarioUpdateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    nombre: string;

    @IsEmpty()
    @IsNumberString()
    @MinLength(10)
    @MaxLength(10)
    cedula: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    id: number;
}
