import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsUUID,
} from 'class-validator';

export class CreateProfitabilityDto {
    @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
    @IsDateString(
        {},
        {
            message:
                'La fecha de inicio debe tener un formato valido (YYYY-MM-DD)',
        },
    )
    startDate!: string;

    @IsNotEmpty({ message: 'La fecha final es requerida' })
    @IsDateString(
        {},
        {
            message: 'La fecha final debe tener un formato valido (YYYY-MM-DD)',
        },
    )
    endDate!: string;

    @IsNotEmpty({ message: 'Los ingresos totales son requeridos' })
    @IsNumber({}, { message: 'Los ingreos totales debe ser un numero' })
    @IsPositive({ message: 'Los ingresos totales debe ser mayor que cero' })
    totalIncome!: number;

    @IsNotEmpty({ message: 'Los costos totales son requeridos' })
    @IsNumber({}, { message: 'Los costos totales debe ser un numero' })
    @IsPositive({ message: 'Los costos totales debe ser mayor que cero' })
    totalCost!: number;

    @IsNotEmpty({ message: 'El beneficio neto es requerido' })
    @IsNumber({}, { message: 'El beneficio neto debe ser un numero' })
    @IsPositive({ message: 'El beneficio neto debe ser mayor que cero' })
    netProfit!: number;

    @IsNotEmpty({ message: 'El porcentaje de ganancia es requerido' })
    @IsNumber({}, { message: 'El porcentaje de ganancia debe ser un numero' })
    @IsPositive({
        message: 'El porcentaje de ganancia debe ser mayor que cero',
    })
    ProfitPercentage!: number;

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
