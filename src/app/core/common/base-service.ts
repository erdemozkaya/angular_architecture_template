import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppInjectorService } from './app-injector.service';

@Injectable({
    providedIn: "root",
})
export class BaseService {
    injector;
    protected serviceUrl: string;
    public loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );
    protected httpClient:HttpClient;

    constructor() {
        try {
            this.injector = Injector.create([
                { provide: HttpClient, useClass: HttpClient, deps: [] }
            ]);
    
            this.httpClient = this.injector.get(HttpClient);
        } catch (error) {
            debugger
        }
    }

    post<T,R>(filterHelper: T, addtionalUrl, showLoadingTemp = true): Observable<R> {
        this.loadingSubject.next(showLoadingTemp);
        return this.httpClient.post(`${this.serviceUrl}/${addtionalUrl}`,filterHelper) as Observable<R>;
    }

    create<T,R>(model:T | FormData,addtionalUrl, showLoadingTemp = true): Observable<R>{
        return this.httpClient.post(`${this.serviceUrl}/${addtionalUrl}`, model) as Observable<R>;
    }

    update<T,R>(model: T | FormData,addtionalUrl="update", showLoadingTemp = true): Observable<R> {
        return this.httpClient.put(`${this.serviceUrl}/${addtionalUrl}`, model) as Observable<R>;
    }

    delete<R>(id: number,addtionalUrl="deletebyid", showLoadingTemp = true): Observable<R> {
        return this.httpClient.delete(this.serviceUrl + `/${addtionalUrl}?entityId=` + id) as Observable<R>;
    }
}