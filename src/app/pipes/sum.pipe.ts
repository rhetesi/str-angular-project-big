import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(items: any[] | null, attr: string): any {

    if (!Array.isArray(items) || !attr) {
      return items;
    }
    return items.reduce((a, b) => parseInt('' + a) + parseInt('' + b[attr]), 0);
}

}
