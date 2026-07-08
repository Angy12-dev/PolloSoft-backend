import { PartialType } from '@nestjs/mapped-types';
import { CreateBatchDto } from './createBatch.dto';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateBatchDto extends PartialType(CreateBatchDto) {
    @IsNotEmpty({ message: 'El id del lote es obligatorio' })
    @IsUUID('4', { message: 'El id del lote debe tener un formato UUID' })
    uuid!: string;

    @IsDateString(
        {},
        { message: 'La fecha de salida debe tener un formato valido' },
    )
    @IsOptional()
    departureDate?: string;
}
