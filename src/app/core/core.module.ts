import { EmptyFormatPipe } from './pipes/empty-format/empty-format.pipe';
import { GlobalFunctionsService } from './services/global-functions/global-functions.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    EmptyFormatPipe
  ],
  exports: [
    EmptyFormatPipe
  ],
  providers: [
    GlobalFunctionsService
  ]
})
export class CoreModule {}
