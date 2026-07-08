import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProfitabilityDto } from './createProfitability.dto';

export class updateProfitability extends PartialType(CreateProfitabilityDto) {
    @IsNotEmpty({ message: 'El id de la rentabilidad es obligatorio' })
    @IsUUID('4', {
        message: 'El id de la rentabilidad debe tener un formato UUID',
    })
    uuid!: string;
}
