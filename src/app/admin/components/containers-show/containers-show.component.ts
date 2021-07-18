import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TissueService} from "../../services/tissue.service";
import {Router} from "@angular/router";
import {LocationService} from "../../services/location.service";
import {ITissue} from "../../interfaces/ITissue";
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {IContainer} from "../../interfaces/IContainer";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-containers-show',
  templateUrl: './containers-show.component.html',
  styleUrls: ['./containers-show.component.css']
})
export class ContainersShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public containers: IContainer[];
  public dataSource: MatTableDataSource<IContainer>;
  columnHeaders = ['containerTypeName', 'action'];
  componentDestroyed: Subject<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private locationService: LocationService,
              private router: Router) { }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
  }

  ngAfterViewInit(): void {
    this.locationService.getAllContainers().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: result => {
        this.containers = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<IContainer>(this.containers);
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

  removeContainer(container: IContainer): void {
    this.locationService.removeContainer(container.containerTypeId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value)
        this.removeRow(container);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  removeRow(row: IContainer): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editContainer(container: IContainer): void {
    this.router.navigate(['containers/edit'], {
      queryParams: {
        containerId: container.containerTypeId
      }
    });
    console.log(`container name: ${container.containerTypeName}`);
  }
}
