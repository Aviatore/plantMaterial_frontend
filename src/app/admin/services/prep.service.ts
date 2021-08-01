import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPlantSample} from "../interfaces/IPlantSample";
import {Urls} from "../urls/urls";
import {ILocationType} from "../interfaces/ILocationType";
import {IPrepType} from "../interfaces/IPrepType";
import {IPrep} from "../interfaces/IPrep";
import {IResponse} from "../interfaces/IResponse";

@Injectable({
  providedIn: 'root'
})
export class PrepService {

  constructor(private httpClient: HttpClient) { }

  addPrep(preps: string): Observable<HttpResponse<IResponse>> {
    return this.httpClient.post<IResponse>(Urls.AddPrep, preps, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  getPrepTypes(): Observable<IPrepType[]> {
    return this.httpClient.get<IPrepType[]>(Urls.GetPrepTypes);
  }

  getPrep() {

  }
}
