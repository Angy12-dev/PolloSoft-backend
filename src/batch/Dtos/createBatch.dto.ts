import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateBatchDto {
    @IsNotEmpty({ message: 'El numero del Lote es requerido' })
    @IsString({ message: 'El numero del lote debe ser un texto' })
    @MaxLength(20, {
        message: 'El numero del lote no puede superar los 20 caracteres',
    })
    lotNumber!: string;

    @IsNotEmpty({ message: 'La fecha de ingreso es requerida' })
    @IsDateString(
        {},
        { message: 'La fecha de ingreso debe tener un formato valido' },
    )
    entryDate!: string;

    @IsNotEmpty({ message: 'La cantidad inicial es requerida' })
    @IsInt({ message: 'La cantidad inicial debe ser un numero entero' })
    @Min(1, { message: 'La cantidad inicial debe ser mayor a 0' })
    initialAmount!: number;

    @IsNotEmpty({ message: 'El proveedor es requerido' })
    @IsString({ message: 'El proveedor debe ser un texto' })
    @MaxLength(100, {
        message: 'El proveedor no debe superar los 100 caracteres',
    })
    supplier!: string;

    @IsString({ message: 'La descripcion debe ser un texto' })
    @IsOptional()
    @MaxLength(500, {
        message: 'La descripcion no puede superar los 500 caracteres',
    })
    description?: string;

    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    @IsUUID('4', { message: 'El id del usuario debe ser un UUID valido' })
    userId!: string;
}
