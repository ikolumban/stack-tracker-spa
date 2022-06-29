import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sign', pure: false })
export class SignPipe implements PipeTransform {
  transform(value: string | null | number): string {
    if (value === null) {
      return '';
    } else if (typeof value === 'string') {
      return +value > 0 ? `+${value}` : `${value}`;
    } else {
      return value > 0 ? `+${value}` : `${value}`;
    }
  }
}
