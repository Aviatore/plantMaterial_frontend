import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ITissue} from "../interfaces/ITissue";
import {Urls} from "../urls/urls";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {IResponse} from "../interfaces/IResponse";
import {IContainer} from "../interfaces/IContainer";
import {ILocationType} from "../interfaces/ILocationType";
import {IShelfPosition} from '../interfaces/IShelfPosition';
import {ILocation} from "../interfaces/ILocation";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getAllContainers(): Observable<IContainer[]> {
    return this.httpClient.get<IContainer[]>(Urls.GetAllContainers);
  }

  getAllLocationTypes(): Observable<ILocationType[]> {
    return this.httpClient.get<ILocationType[]>(Urls.GetAllLocationTypes);
  }

  getAllShelfPositions(): Observable<IShelfPosition[]> {
    return this.httpClient.get<IShelfPosition[]>(Urls.GetAllShelfPositions);
  }

  getAllLocations(): Observable<ILocation[]> {
    return this.httpClient.get<ILocation[]>(Urls.GetAllLocations);
  }

  getContainer(containerId: string): Observable<IContainer> {
    return this.httpClient.get<IContainer>(Urls.GetAllContainers, {
      params: new HttpParams().set('containerId', containerId)
    });
  }

  getLocationType(locationTypeId: string): Observable<ILocationType> {
    return this.httpClient.get<ILocationType>(Urls.GetAllLocationTypes, {
      params: new HttpParams().set('locationTypeId', locationTypeId)
    });
  }

  getShelfPosition(shelfPositionId: string): Observable<IShelfPosition> {
    return this.httpClient.get<IShelfPosition>(Urls.GetAllShelfPositions, {
      params: new HttpParams().set('shelfPositionId', shelfPositionId)
    });
  }

  getLocation(locationId: string): Observable<ILocation> {
    return this.httpClient.get<ILocation>(Urls.GetAllLocations, {
      params: new HttpParams().set('locationId', locationId)
    });
  }

  addContainer(container: string): Observable<HttpResponse<HttpResponse<Observable<IContainer>>>> {
    return this.httpClient.post<HttpResponse<Observable<IContainer>>>(Urls.AddContainer, container, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  addLocationType(locationType: string): Observable<HttpResponse<HttpResponse<Observable<ILocationType>>>> {
    return this.httpClient.post<HttpResponse<Observable<ILocationType>>>(Urls.AddLocationType, locationType, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  addShelfPosition(shelfPosition: string): Observable<HttpResponse<HttpResponse<Observable<IShelfPosition>>>> {
    return this.httpClient.post<HttpResponse<Observable<IShelfPosition>>>(Urls.AddShelfPosition, shelfPosition, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  addLocation(location: string): Observable<HttpResponse<HttpResponse<Observable<ILocation>>>> {
    return this.httpClient.post<HttpResponse<Observable<ILocation>>>(Urls.AddLocation, location, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  removeContainer(containerId: string): Observable<HttpResponse<HttpResponse<Observable<IResponse>>>> {
    return this.httpClient.get<HttpResponse<Observable<IResponse>>>(Urls.RemoveContainer, {
      params: new HttpParams().set('containerId', containerId),
      observe: 'response'
    });
  }

  removeLocationType(locationTypeId: string): Observable<HttpResponse<HttpResponse<Observable<IResponse>>>> {
    return this.httpClient.get<HttpResponse<Observable<IResponse>>>(Urls.RemoveLocationType, {
      params: new HttpParams().set('locationTypeId', locationTypeId),
      observe: 'response'
    });
  }

  removeShelfPosition(shelfPositionId: string): Observable<HttpResponse<HttpResponse<Observable<IShelfPosition>>>> {
    return this.httpClient.get<HttpResponse<Observable<IShelfPosition>>>(Urls.RemoveShelfPosition, {
      params: new HttpParams().set('shelfPositionId', shelfPositionId),
      observe: 'response'
    });
  }

  removeLocation(locationId: string): Observable<HttpResponse<HttpResponse<Observable<ILocation>>>> {
    return this.httpClient.get<HttpResponse<Observable<ILocation>>>(Urls.RemoveLocation, {
      params: new HttpParams().set('locationId', locationId),
      observe: 'response'
    });
  }
}
