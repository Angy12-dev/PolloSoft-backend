import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateInventoryMovementDto {
    @IsNotEmpty({ message: 'El uuid del inventario es requerido' })
    @IsUUID('4', {
        message: 'El uuid del inventario no es valido',
    })
    inventoryId!: string;

    @IsNotEmpty({ message: 'El uuid del lote es requerido' })
    @IsUUID('4', {
        message: 'El uuid del lote no es valido',
    })
    batchId!: string;

    @IsNotEmpty({ message: 'La cantidad es requerida' })
    @IsNumber({}, { message: 'La cantidad debe ser un numero' })
    @IsPositive({ message: 'La cantidad debe ser mayor que cero' })
    quantity!: number;

    @IsNotEmpty({ message: 'El uuid del usuario es requerido' })
    @IsUUID('4', {
        message: 'El uuid del usuario no es valido',
    })
    userId!: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser una cadena de caracteres' })
    @MaxLength(300, {
        message: 'La descripcion no debe superar los 300 caracteres',
    })
    description?: string;
}
