import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITissue} from '../interfaces/ITissue';
import {Urls} from '../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class TissueService {

  constructor(private httpClient: HttpClient) { }

  getAllTissues(): Observable<ITissue[]> {
    return this.httpClient.get<ITissue[]>(Urls.GetAllTissues);
  }
}
