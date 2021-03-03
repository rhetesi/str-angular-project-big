import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | null, phrase: string, key: string = ''): any[] | null {

    if (!Array.isArray(value) || !phrase || !key) {
      return value;
    }

    phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();
    return value.filter(item => {
      if (typeof item[key] === 'number' && typeof phrase === 'number') {
        return item[key] = phrase;
      }

      if (key === 'zip' || key === 'country' || key === 'city' || key === 'street' || key === 'notes') {
        console.log('object', item.address)
        for (let key1 in item.address) {
          if (key1 === key) {
            const strItem: string = ('' + item.address[key1]).toLowerCase();
            // console.log('object', item.address[key1])
            // console.log('strItem', strItem)
            return strItem.includes((phrase as string));
          }
        }
      }

      const strItem: string = ('' + item[key]).toLowerCase();
      return strItem.includes((phrase as string));
    })

    /* phrase = ('' + phrase).toLowerCase();
    return value.filter(item => {
      const strItem: string = ('' + item[key]).toLowerCase();
      return strItem.includes(phrase);
    }) */

  }


}
