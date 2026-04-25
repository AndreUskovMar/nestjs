import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'Learn NestJS',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Build app',
      isCompleted: true,
    },
  ];

  create(dto: CreateTaskDto) {
    const newTask = {
      id: this.tasks.length + 1,
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      isCompleted: false,
    };

    this.tasks.push(newTask);
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`This action returns a #${id} task`);
    }

    return task;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findOne(id);

    if (!task) {
      throw new NotFoundException(`This action returns a #${id} task`);
    }

    Object.assign(task, dto);

    return task;
  }

  remove(id: number) {
    const task = this.findOne(id);

    if (!task) {
      throw new NotFoundException(`This action returns a #${id} task`);
    }

    this.tasks = this.tasks.filter((t) => t.id !== task.id);

    return task;
  }
}
