import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GuidEmpty} from '../../constants';
import {takeUntil} from 'rxjs/operators';
import {ILocationType} from '../../interfaces/ILocationType';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {IShelfPosition} from '../../interfaces/IShelfPosition';
import {ISpecies} from '../../interfaces/ISpecies';

@Component({
  selector: 'app-shelf-position-show',
  templateUrl: './shelf-position-show.component.html',
  styleUrls: ['./shelf-position-show.component.css']
})
export class ShelfPositionShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public shelfPositions: IShelfPosition[];
  public dataSource: MatTableDataSource<IShelfPosition>;
  columnHeaders = ['shelfPositionName', 'action'];
  componentDestroyed: Subject<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private locationService: LocationService,
              private router: Router) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  ngAfterViewInit(): void {
    this.locationService.getAllShelfPositions().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: result => {
        this.shelfPositions = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<IShelfPosition>(this.shelfPositions);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  applyFilter(value: string): void {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  removeShelfPosition(shelfPosition: IShelfPosition): void {
    this.locationService.removeShelfPosition(shelfPosition.shelfPositionId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value);
        this.removeRow(shelfPosition);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  removeRow(row: IShelfPosition): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editShelfPosition(shelfPosition: IShelfPosition): void {
    this.router.navigate(['shelf-position/edit'], {
      queryParams: {
        shelfPositionId: shelfPosition.shelfPositionId
      }
    });
    console.log(`shelfPosition name: ${shelfPosition.shelfPositionName}`);
  }
}
