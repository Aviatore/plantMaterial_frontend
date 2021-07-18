import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITissue} from '../interfaces/ITissue';
import {Urls} from '../urls/urls';
import {IResponse} from "../interfaces/IResponse";

@Injectable({
  providedIn: 'root'
})
export class TissueService {

  constructor(private httpClient: HttpClient) { }

  getAllTissues(): Observable<ITissue[]> {
    return this.httpClient.get<ITissue[]>(Urls.GetAllTissues);
  }

  getTissue(tissueId: string): Observable<ITissue> {
    return this.httpClient.get<ITissue>(Urls.GetAllTissues, {
      params: new HttpParams().set('tissueId', tissueId)
    });
  }

  addTissue(tissue: string): Observable<HttpResponse<HttpResponse<Observable<ITissue>>>> {
    return this.httpClient.post<HttpResponse<Observable<ITissue>>>(Urls.AddTissue, tissue, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    })
  }

  removeSpecies(tissueId: string): Observable<HttpResponse<HttpResponse<Observable<IResponse>>>> {
    return this.httpClient.get<HttpResponse<Observable<IResponse>>>(Urls.RemoveTissue, {
      params: new HttpParams().set('tissueId', tissueId),
      observe: 'response'
    })
  }
}
