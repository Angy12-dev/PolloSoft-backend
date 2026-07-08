import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';
import { StateEnum } from 'src/enum/state.enum';

export class CreateInventoryDto {
    @IsNotEmpty({ message: 'La fecha de registro es requerida' })
    @IsDateString(
        {},
        {
            message:
                'La fecha de registro debe tener un formato valido (YYYY-MM-DD)',
        },
    )
    registrationDate!: string;

    @IsNotEmpty({ message: ' El producto es requerido' })
    @IsString({ message: 'El producto debe ser una cadena de caracteres' })
    @MaxLength(100, {
        message: 'El producto no debe superar los 100 caracteres',
    })
    product!: string;

    @IsNotEmpty({ message: 'La cantidad es requerida' })
    @IsNumber({}, { message: 'La cantidad debe ser un numero' })
    @IsPositive({ message: 'La cantidad debe ser mayor que cero' })
    amount!: number;

    @IsNotEmpty({ message: 'La unidad es requerida' })
    @IsString({ message: 'la unidad debe ser una cadena de caracteres' })
    @MaxLength(100, {
        message: 'La unidad no debe superar los 100 caracteres',
    })
    unit!: string;

    @IsOptional()
    @IsEnum(StateEnum, { message: 'El estado debe ser in_stock o low_stock' })
    state?: StateEnum;

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
