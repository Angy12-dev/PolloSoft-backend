import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsUUID,
} from 'class-validator';

export class CreateSalesDto {
    @IsNotEmpty({ message: 'La fecha de venta es requerida' })
    @IsDateString(
        {},
        {
            message:
                'La fecha de venta debe tener un formato valido (YYYY-MM-DD)',
        },
    )
    saleDate!: string;

    @IsNotEmpty({ message: 'La cantidad de la venta es requerida' })
    @IsNumber({}, { message: 'La cantidad de la venta debe ser un numero' })
    @IsPositive({
        message: 'La cantidad de la venta debe ser mayor que cero',
    })
    amount!: number;

    @IsNotEmpty({ message: 'El peso del producto de la venta es requerido ' })
    @IsNumber(
        {},
        { message: 'El peso del producto de la venta debe ser un numero' },
    )
    @IsPositive({
        message: 'El peso del producto de la venta debe ser mayor que cero',
    })
    weightKg!: number;

    @IsNotEmpty({ message: 'El valor unitario es requerido' })
    @IsNumber({}, { message: 'El valor unitario debe ser un numero' })
    @IsPositive({
        message: 'El valor unitario debe ser mayor que cero',
    })
    unitValue!: number;

    @IsNotEmpty({ message: 'El valor total es requerido' })
    @IsNumber({}, { message: 'El valor total debe ser un numero' })
    @IsPositive({
        message: 'El valor total debe ser mayor que cero',
    })
    totalValue!: number;

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
