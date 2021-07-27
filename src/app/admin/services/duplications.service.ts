import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IPopulation} from "../interfaces/IPopulation";
import {Urls} from "../urls/urls";
import {HttpClient} from "@angular/common/http";
import {IDuplication} from "../interfaces/IDuplication";

@Injectable({
  providedIn: 'root'
})
export class DuplicationsService {

  constructor(private httpClient: HttpClient) { }

  getAllDuplications(): Observable<IDuplication[]> {
    return this.httpClient.get<IDuplication[]>(Urls.GetAllDuplications);
  }
}
