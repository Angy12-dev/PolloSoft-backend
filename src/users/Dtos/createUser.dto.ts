import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class createUserDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, {
        message: 'El nombre solo puede contener letras y espacios',
    })
    @MinLength(3, {
        message: 'El nombre debe tener al menos 3 caracteres',
    })
    @MaxLength(50, {
        message: 'El nombre no puede tener más de 50 caracteres',
    })
    fullName: string;

    @IsEmail(
        {},
        {
            message:
                'El email debe tener un formato de correo electrónico válido',
        },
    )
    email: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
        {
            message:
                'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
        },
    )
    password: string;
}
