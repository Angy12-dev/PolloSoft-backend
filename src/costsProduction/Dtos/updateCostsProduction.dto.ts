import { PartialType } from '@nestjs/mapped-types';
import { CreateCostsProductionDto } from './createCostsProduction.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class updateCostsProductionDto extends PartialType(
    CreateCostsProductionDto,
) {
    @IsNotEmpty({ message: 'El id del costo de produccion es obligatorio' })
    @IsUUID('4', {
        message: 'El id del costo de produccion debe tener un formato UUID',
    })
    uuid!: string;
}
