import { ErrorHandler, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../../components/app/app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { HttpBackend, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppInjectorService } from 'src/app/core/common/app-injector.service';
import { HeaderInterceptor } from 'src/app/core/configure/interceptors/header-interceptor';
import { APP_BASE_HREF, DecimalPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UnAuthorizedResponseInterceptor } from 'src/app/core/configure/interceptors/unauthorized-interceptor';
import { CoreModule } from 'src/app/core/core.module';
import { ExceptionHandlingService } from 'src/app/core/services/exception-handling/exception-handling.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton:true,
      extendedTimeOut:10,
      resetTimeoutOnDuplicate:true,
      progressBar:true,
      preventDuplicates:true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
    CoreModule
  ],
  providers: [
    DecimalPipe,
    environment.production ? 
    {
      provide: ErrorHandler,
      useClass: ExceptionHandlingService,
    } : [],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnAuthorizedResponseInterceptor,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector:Injector){
    AppInjectorService.setInjector(injector);
  }
}

export function HttpLoaderFactory(handler: HttpBackend) {
  const http = new HttpClient(handler);

  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
