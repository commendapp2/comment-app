import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, len: number) {
    if (value.length > len) {
      return value.substr(0, len) + '...';
    }
    return value;
  }
}