import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISpecies} from '../interfaces/ISpecies';
import {Urls} from '../urls/urls';
import {IResponse} from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private httpClient: HttpClient) { }

  getAllSpecies(): Observable<ISpecies[]> {
    return this.httpClient.get<ISpecies[]>(Urls.GetAllSpecies);
  }

  getAllSpeciesAlias(): Observable<ISpecies[]> {
    const params = new HttpParams().set('alias', 'true');

    return this.httpClient.get<ISpecies[]>(Urls.GetAllSpecies, {
      params
    });
  }

  getSpeciesAlias(speciesId: string): Observable<ISpecies> {
    const params = new HttpParams()
      .set('alias', 'true')
      .set('speciesId', speciesId);

    return this.httpClient.get<ISpecies>(Urls.GetAllSpecies, {
      params
    });
  }

  removeSpecies(speciesId: string): Observable<any> {
    const url = `${Urls.GetAllSpecies}/${speciesId}/remove`;
    return this.httpClient.get<HttpResponse<Observable<IResponse>>>(url, {
      observe: 'response'
    });
  }
}

