import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tissue} from '../interfaces/tissue';
import {Urls} from '../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class TissueService {

  constructor(private httpClient: HttpClient) { }

  getAllTissues(): Observable<Tissue[]> {
    return this.httpClient.get<Tissue[]>(Urls.GetAllTissues);
  }
}
