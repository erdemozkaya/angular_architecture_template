import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MySpinnerService {
  loadText?:string;
  showMethod: Observable<any>;

  private showSubject = new Subject<any>();

  constructor(private spinner: NgxSpinnerService) {
    this.showMethod = this.showSubject.asObservable();
  }

  show(options?: Spinner, name?: string) {
    if(options){
      this.loadText = options.template;
      this.setMessage(this.loadText);
    }
    this.spinner.show(name, options);
  }

  setMessage(message){
    setTimeout(() => {
      this.showSubject.next(message);
    }, 200);
  }

  hide(name?: string) {
    this.spinner.hide(name);
  }
}
