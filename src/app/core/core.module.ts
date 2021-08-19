import { GlobalFunctionsService } from './services/global-functions/global-functions.service';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [],
  providers: [
    GlobalFunctionsService
  ]
})
export class CoreModule {}