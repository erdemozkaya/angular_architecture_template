import { Pipe, PipeTransform } from '@angular/core';
import { GlobalFunctionsService } from 'src/app/core/services/global-functions/global-functions.service';

@Pipe({
  name: 'emptyFormat'
})
export class EmptyFormatPipe implements PipeTransform {

  constructor(private globalService:GlobalFunctionsService){}
  
  transform(value: any, args?: any): any {
    return this.globalService.emptyToSymbol(value,args);
  }

}