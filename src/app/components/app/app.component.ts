import { BaseService } from '../../core/common/base-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-architecture-template';

  constructor(
    public baseService:BaseService
  ){}

  test(){
    this.baseService.post<boolean,boolean>(true,undefined,true);
  }
}
