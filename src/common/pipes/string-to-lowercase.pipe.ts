import { Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class StringToLowerCasePipe<T> implements PipeTransform {
  transform(value: T) {
    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }

    return value;
  }
}
