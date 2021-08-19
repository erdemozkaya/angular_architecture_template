import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector, NgZone } from "@angular/core";
import { ErrorService } from "./error/error.service";

@Injectable({
  providedIn: "root",
})
export class ExceptionHandlingService {
  constructor(private injector: Injector,private ngZone : NgZone) {}

  handleError(error: Error | HttpErrorResponse | any){
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(ToastrService);
    let message;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      if(message){
        this.ngZone.run(()=>{
          notifier.error(message);
        });
      }
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      if(message){
        this.ngZone.run(()=>{
          notifier.error(message);
        });
      }
    }
    // Always log errors
    //console.error(error);
  }
}
