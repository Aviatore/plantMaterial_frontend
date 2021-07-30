import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPopulation} from "../interfaces/IPopulation";
import {Urls} from "../urls/urls";
import {IPlantSample} from "../interfaces/IPlantSample";
import {IResponse} from "../interfaces/IResponse";

@Injectable({
  providedIn: 'root'
})
export class PlantSampleService {

  constructor(private httpClient: HttpClient) { }

  addPlantSample(plantSamples: string): Observable<HttpResponse<HttpResponse<Observable<any>>>> {
    return this.httpClient.post<HttpResponse<Observable<IPlantSample>>>(Urls.AddPlantSamples, plantSamples, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  editPlantSample(plantSample: string): Observable<HttpResponse<HttpResponse<Observable<any>>>> {
    return this.httpClient.post<HttpResponse<Observable<IPlantSample>>>(Urls.EditPlantSamples, plantSample, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  removePlantSample(populationId: string): Observable<HttpResponse<HttpResponse<Observable<IPopulation>>>> {
    return this.httpClient.get<HttpResponse<Observable<IPopulation>>>(Urls.RemovePopulation, {
      params: new HttpParams().set('populationId', populationId),
      observe: 'response'
    });
  }

  getPlantSamples(plantSampleFilters: string): Observable<IPlantSample[]> {
    return this.httpClient.post<IPlantSample[]>(Urls.GetPlantSample, plantSampleFilters, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updatePlantSamples(plantSamples: string): Observable<IResponse> {
    return this.httpClient.post<IResponse>(Urls.UpdatePlantSample, plantSamples, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
