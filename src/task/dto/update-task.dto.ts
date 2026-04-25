import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsNotEmpty()
  @Length(4, 30, { message: 'Title must be between 4 and 30 characters' })
  title: string;
  @IsBoolean()
  isCompleted: boolean;
}
