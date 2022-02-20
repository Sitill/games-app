import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[]|undefined,filterFunction:Function): any[] {
    return array!.filter(e => filterFunction(e));
  }

}
