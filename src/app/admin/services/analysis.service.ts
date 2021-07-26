import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IContainer} from "../interfaces/IContainer";
import {Urls} from "../urls/urls";
import {IAnalysisType} from "../interfaces/IAnalysisType";
import {IResponse} from "../interfaces/IResponse";

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private httpClient: HttpClient) { }

  getAllAnalysisTypes(): Observable<IAnalysisType[]> {
    return this.httpClient.get<IAnalysisType[]>(Urls.GetAllAnalysisType);
  }

  getAnalysisType(analysisTypeId: string): Observable<IAnalysisType> {
    return this.httpClient.get<IAnalysisType>(Urls.GetAllAnalysisType, {
      params: new HttpParams().set('analysisTypeId', analysisTypeId)
    });
  }

  addAnalysisType(analysisType: string): Observable<HttpResponse<HttpResponse<Observable<IAnalysisType>>>> {
    return this.httpClient.post<HttpResponse<Observable<IAnalysisType>>>(Urls.AddAnalysisType, analysisType, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  removeAnalysisType(analysisTypeId: string): Observable<HttpResponse<HttpResponse<Observable<IAnalysisType>>>> {
    return this.httpClient.get<HttpResponse<Observable<IAnalysisType>>>(Urls.RemoveAnalysisType, {
      params: new HttpParams().set('analysisTypeId', analysisTypeId),
      observe: 'response'
    });
  }
}
