import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAnalysisType} from "../interfaces/IAnalysisType";
import {Urls} from "../urls/urls";
import {IPopulation} from "../interfaces/IPopulation";

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  constructor(private httpClient: HttpClient) { }

  getAllPopulations(): Observable<IPopulation[]> {
    return this.httpClient.get<IPopulation[]>(Urls.GetAllPopulations);
  }

  getPopulationsBySpecies(speciesId: string): Observable<IPopulation[]> {
    return this.httpClient.get<IPopulation[]>(Urls.GetPopulationBySpecies, {
      params: new HttpParams().set('speciesId', speciesId)
    });
  }

  getPopulation(populationId: string): Observable<IPopulation> {
    return this.httpClient.get<IPopulation>(Urls.GetAllPopulations, {
      params: new HttpParams().set('populationId', populationId)
    });
  }

  addPopulation(population: string): Observable<HttpResponse<HttpResponse<Observable<IPopulation>>>> {
    return this.httpClient.post<HttpResponse<Observable<IPopulation>>>(Urls.AddPopulation, population, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  removePopulation(populationId: string): Observable<HttpResponse<HttpResponse<Observable<IPopulation>>>> {
    return this.httpClient.get<HttpResponse<Observable<IPopulation>>>(Urls.RemovePopulation, {
      params: new HttpParams().set('populationId', populationId),
      observe: 'response'
    });
  }
}
