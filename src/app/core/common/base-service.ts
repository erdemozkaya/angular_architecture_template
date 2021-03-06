import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppInjectorService } from './app-injector.service';
import { BaseServiceSubjectService } from "./base-service-subject";

@Injectable({
    providedIn: "root",
})
export class BaseService {
    protected httpClient:HttpClient;

    constructor() {
        try {
            this.httpClient = AppInjectorService.getInjector().get<HttpClient>(HttpClient);
        } catch (error) {
        }
    }
  
    private setSubject(showLoadingTemp:boolean){
        BaseServiceSubjectService.setSubject(showLoadingTemp);
    }

    post<T,R>(filterHelper: T, addtionalUrl, showLoadingTemp = true): Observable<R> {
        this.setSubject(showLoadingTemp);
        return this.httpClient.post(`${addtionalUrl}`,filterHelper) as Observable<R>;
    }

    create<T,R>(model:T | FormData,addtionalUrl, showLoadingTemp = true): Observable<R>{
        this.setSubject(showLoadingTemp);
        return this.httpClient.post(`${addtionalUrl}`, model) as Observable<R>;
    }

    update<T,R>(model: T | FormData,addtionalUrl="update", showLoadingTemp = true): Observable<R> {
        this.setSubject(showLoadingTemp);
        return this.httpClient.put(`${addtionalUrl}`, model) as Observable<R>;
    }

    delete<R>(id: number,addtionalUrl="deletebyid", showLoadingTemp = true): Observable<R> {
        this.setSubject(showLoadingTemp);
        return this.httpClient.delete(`/${addtionalUrl}?entityId=` + id) as Observable<R>;
    }
}
