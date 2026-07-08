import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './createInventory.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class updateInventoryDto extends PartialType(CreateInventoryDto) {
    @IsNotEmpty({ message: 'El id del inventario es obligatorio' })
    @IsUUID('4', {
        message: 'El id del inventario debe tener un formato UUID',
    })
    uuid!: string;
}
