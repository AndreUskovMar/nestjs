import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Андрей',
    maxLength: 50,
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50, { message: 'Max length is 50' })
  name: string;

  @ApiProperty({
    description: 'Почтовый адрес',
    example: 'user@gmail.com',
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Uncorrected email format' })
  email: string;

  @ApiProperty({
    description: 'Пароль от аккаунта',
    example: '123456',
    minLength: 6,
    maxLength: 50,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Max length must be more than 6' })
  @MaxLength(20, { message: 'Max length is 20' })
  password: string;
}
