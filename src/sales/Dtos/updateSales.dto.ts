import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesDto } from './createSales.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSalesDto extends PartialType(CreateSalesDto) {
    @IsNotEmpty({ message: 'El id de la venta es obligatorio' })
    @IsUUID('4', { message: 'El id de la venta debe tener un formato UUID' })
    uuid!: string;
}
