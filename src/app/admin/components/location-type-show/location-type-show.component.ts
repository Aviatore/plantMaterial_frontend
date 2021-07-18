import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {ITissue} from "../../interfaces/ITissue";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {ILocationType} from "../../interfaces/ILocationType";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-location-type-show',
  templateUrl: './location-type-show.component.html',
  styleUrls: ['./location-type-show.component.css']
})
export class LocationTypeShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public locationTypes: ILocationType[];
  public dataSource: MatTableDataSource<ILocationType>;
  columnHeaders = ['locationTypeName', 'action'];
  componentDestroyed: Subject<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private locationService: LocationService,
              private router: Router) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
  }

  ngAfterViewInit(): void {
    this.locationService.getAllLocationTypes().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: result => {
        this.locationTypes = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<ILocationType>(this.locationTypes);
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

  removeLocationType(locationType: ILocationType): void {
    this.locationService.removeLocationType(locationType.locationTypeId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value)
        this.removeRow(locationType);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  removeRow(row: ILocationType): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editLocationType(locationType: ILocationType): void {
    this.router.navigate(['location-type/edit'], {
      queryParams: {
        locationTypeId: locationType.locationTypeId
      }
    });
    console.log(`locationType name: ${locationType.locationTypeName}`);
  }
}
