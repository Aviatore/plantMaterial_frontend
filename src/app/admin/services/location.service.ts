import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ITissue} from "../interfaces/ITissue";
import {Urls} from "../urls/urls";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {IResponse} from "../interfaces/IResponse";
import {IContainer} from "../interfaces/IContainer";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getAllContainers(): Observable<IContainer[]> {
    return this.httpClient.get<IContainer[]>(Urls.GetAllContainers);
  }

  getContainer(containerId: string): Observable<IContainer> {
    return this.httpClient.get<IContainer>(Urls.GetAllContainers, {
      params: new HttpParams().set('containerId', containerId)
    });
  }

  addContainer(container: string): Observable<HttpResponse<HttpResponse<Observable<IContainer>>>> {
    return this.httpClient.post<HttpResponse<Observable<IContainer>>>(Urls.AddContainer, container, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    })
  }

  removeContainer(containerId: string): Observable<HttpResponse<HttpResponse<Observable<IResponse>>>> {
    return this.httpClient.get<HttpResponse<Observable<IResponse>>>(Urls.RemoveContainer, {
      params: new HttpParams().set('containerId', containerId),
      observe: 'response'
    })
  }
}
