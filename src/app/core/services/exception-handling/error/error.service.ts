import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private injector: Injector) {}
  getClientErrorMessage(error: Error): string {
    return error.message ? 
           error.message : 
           error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    const translateService = this.injector.get(TranslateService);
    if(error.error && error.status != 0){
      if(typeof error.error === "object"){
        let message;
        translateService
            .get("errorCode." + error.error.code)
            .subscribe((res) => (message = res));
        return message;
      }else{
        return error.error;
      }
    }
    else{
      if(navigator.onLine){
        return error.message;
      }else{
        return "No Internet Connection";
      }
    }
  }

}
