import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AppInjectorService } from 'src/app/core/common/app-injector.service';
import { GlobalFunctionsService } from 'src/app/core/services/global-functions/global-functions.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private injector;

  //#region services
  public globalSettingsService: GlobalFunctionsService;
  protected translateService: TranslateService;
  //#endregion

  constructor() {
    try {
      this.injector = AppInjectorService.getInjector();
      
      this.globalSettingsService = this.injector.get(GlobalFunctionsService);
      this.translateService = this.injector.get(TranslateService);
    } catch (error) {
      console.error('Failed initializing dependencies', error)
    }
  }

  ngOnInit(): void {
  }

  trackByFn(index,item){
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
