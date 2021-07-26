import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ILocationType} from "../../interfaces/ILocationType";
import {MatTableDataSource} from "@angular/material/table";
import {forkJoin, Observable, Subject} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {ILocation} from "../../interfaces/ILocation";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {map, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-location-show',
  templateUrl: './location-show.component.html',
  styleUrls: ['./location-show.component.css']
})
export class LocationShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public locations: ILocation[];
  public dataSource: MatTableDataSource<ILocation>;
  columnHeaders = ['locationName', 'locationTypeName', 'action'];
  componentDestroyed: Subject<any>;
  @ViewChild(MatSort) sort: MatSort;
  public ls: LocationService;
  a1 = false;
  a2 = false;
  a3 = false;

  constructor(private locationService: LocationService,
              private router: Router) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
    this.ls = this.locationService;
  }

  ngAfterViewInit(): void {
    this.locationService.getAllLocations().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: result => {
        this.locations = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<ILocation>(this.locations);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  applyFilter(value: string): void {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  removeLocationType(location: ILocation): void {
    this.locationService.removeLocation(location.locationId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value)
        this.removeRow(location);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  removeRow(row: ILocation): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editLocationType(location: ILocation): void {
    this.router.navigate(['location/edit'], {
      queryParams: {
        locationId: location.locationId
      }
    });
  }
}
