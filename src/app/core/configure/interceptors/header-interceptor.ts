import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MySpinnerService } from "src/app/core/services/mySpinner/my-spinner.service";
import { catchError, delay, finalize, retry, takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { ActivationEnd, Router } from "@angular/router";
import { GlobalFunctionsService } from "../../services/global-functions/global-functions.service";
import { ExceptionHandlingService } from "../../services/exception-handling/exception-handling.service";
import { BaseServiceSubjectService } from "../../common/base-service-subject";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    private totalRequests = 0;
    constructor(
        router: Router,
        private globalSettings: GlobalFunctionsService,
        private mySpinner: MySpinnerService,
        private translate: TranslateService,
        private exceptionHandlingService:ExceptionHandlingService
    ) {
        router.events.subscribe((event) => {
            // An event triggered at the end of the activation part of the Resolve phase of routing.
            if (event instanceof ActivationEnd) {
                // Cancel pending calls
            }
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        //istek gonderme durumlarinda loading islemin gozukmesi icin
        if (this.isLoading()) {
            this.setLoading(req);
        }

        let requestObject = req.clone({
            url: `${this.globalSettings.getAPIUrl() + req.url}`,
            headers: req.headers
                //.set('vendor', 'Bilsoft')
                .set("Access-Control-Allow-Origin", "*")
                .set("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept")
                .set(
                    "Authorization",
                    `Bearer ${this.token}`
                ),
        });
        if (!(req.body instanceof FormData)) {
            requestObject = requestObject.clone({
                headers: requestObject.headers.append(
                    "Content-Type",
                    "application/json"
                ),
            });
        }
        return next.handle(requestObject).pipe(
            // delay(1000),
            // retry(1),
            //takeUntil(this.httpCancelService.onCancelPendingRequests()),
            catchError(err => {
                this.exceptionHandlingService.handleError(err);
                return throwError(err);
            }),
            finalize(() => {
                //loading islemi atandiysa onu kapatmak icin
                if (this.isLoading()) {
                    this.totalRequests--;
                    if (this.totalRequests === 0) {
                        this.mySpinner.hide();
                    }
                }
            })
        );
    }

    token = () => {return ""}

    //setup loading
    setLoading(req: HttpRequest<any>) {
        this.totalRequests++;
        this.mySpinner.show();
        let spinnerMessage = "";
        const split = req.url.split("/");
        if (split.length > 0) {
            let controller = split[0];
            let httpTemplate: string;
            if (split.length > 1) {
                httpTemplate = split[1];
            }

            this.translate.get("modelName-" + controller).subscribe((data) => {
                //spinnerMessage += this.globalSettings.convertCamelCaseToSpace(data);
                spinnerMessage += data;
                switch (req.method) {
                    case "POST":

                        if (httpTemplate && httpTemplate.includes("get")) {
                            spinnerMessage += " bilgisi al??n??yor";
                        } else if (httpTemplate && httpTemplate.includes("add")) {
                            spinnerMessage += " ekleniyor";
                        } else {
                            spinnerMessage += " bilgisi al??n??yor";
                        }
                        break;

                    case "PUT":
                        spinnerMessage += " bilgisi g??ncelleniyor";
                        break;

                    case "DELETE":
                        spinnerMessage += " bilgisi siliniyor";
                        break;

                    case "GET":
                        spinnerMessage += " bilgisi al??n??yor";
                        break;

                    default:
                        break;
                }
                this.mySpinner.setMessage(spinnerMessage);
            });
        }
    }

    //loading is show
    isLoading() {
        return BaseServiceSubjectService.getSubjectValue();
    }
}
