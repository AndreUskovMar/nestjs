import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { StartsWith } from '../../common/decorators/starts-with.decorator';

export enum TaskTag {
  WORK = 'work',
  LEARN = 'learn',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task:', {
    message: 'Название должно начинаться с "Task:"',
  })
  @Length(4, 30, { message: 'Title must be between 4 and 30 characters' })
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsNumber({}, { message: 'Значение должно быть целым числом' })
  @IsOptional()
  priority: number;
  @IsArray({ message: 'Тэги должны быть массивом' })
  @IsEnum(TaskTag, { message: 'Недопустимое значение тэга', each: true })
  @IsOptional()
  tags: Array<TaskTag>;
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/)
  password: string;
  @IsUrl(
    {
      protocols: ['https'],
      require_protocol: true,
      require_valid_protocol: false,
    },
    { message: 'Текст с ошибкой' },
  )
  websiteUrl: string;
  @IsUUID('4', { message: 'Некорректный формат uuid' })
  userId: string;
}
