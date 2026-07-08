import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateCostsProductionDto {
    @IsNotEmpty({ message: 'La fecha de costo es requerida' })
    @IsDateString(
        {},
        { message: 'La fecha de costo debe tener un formato valido' },
    )
    costDate!: string;

    @IsNotEmpty({ message: 'El tipo de costo es requerido' })
    @IsString({ message: 'El tipo de costo debe ser un texto' })
    @MaxLength(100, {
        message: 'El tipo de costo no debe superar los 100 caracteres',
    })
    costType!: string;

    @IsNotEmpty({ message: 'La descripcion es requerida' })
    @IsString({ message: 'La descripcion debe ser un texto' })
    @MaxLength(500, {
        message: 'La descripcion no debe superar los 500 caracteres',
    })
    description!: string;

    @IsNotEmpty({ message: 'La cantidad es requerida' })
    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @IsPositive({ message: 'La cantidad debe ser mayor que cero' })
    amount!: number;

    @IsNotEmpty({ message: 'El valor unitario es requerido' })
    @IsNumber({}, { message: 'El valor unitario debe ser un numero' })
    @IsPositive({ message: 'El valor unitario debe ser mayor que cero' })
    unitValue!: number;

    @IsNotEmpty({ message: 'El uuid del usuario es requerido' })
    @IsUUID('4', {
        message: 'El uuid del usuario no es valido',
    })
    userId!: string;

    @IsNotEmpty({ message: 'El uuid del lote es requerido' })
    @IsUUID('4', {
        message: 'El uuid del lote no es valido',
    })
    batchId!: string;
}
