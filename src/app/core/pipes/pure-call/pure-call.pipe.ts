import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pureCall'
})
export class PureCallPipe implements PipeTransform {

  transform(func:Function, ...args:any[]):any {
		return func(...args);
	}

}