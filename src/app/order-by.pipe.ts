import { orderBy } from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';


/**
 * https://mdmoin07.medium.com/sort-pipe-in-angular-6-7-f22475cc4054
 */

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], order: any = '', column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') {
      if (order === 'asc') { return value.sort() }
      else { return value.sort().reverse(); }
    } // sort 1d array
    return orderBy(value, [column], [order]);
  }

}
