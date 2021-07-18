import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TissueService} from '../../services/tissue.service';
import {Observable, Subject} from 'rxjs';
import {ITissue} from '../../interfaces/ITissue';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {takeUntil} from "rxjs/operators";
import {ISpecies} from "../../interfaces/ISpecies";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tissue-show',
  templateUrl: './tissue-show.component.html',
  styleUrls: ['./tissue-show.component.css']
})
export class TissueShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public tissues: ITissue[];
  public dataSource: MatTableDataSource<ITissue>;
  columnHeaders = ['tissueName', 'action'];
  componentDestroyed: Subject<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tissueService: TissueService,
              private router: Router) { }

  ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
  }

  ngAfterViewInit(): void {
    this.tissueService.getAllTissues().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: result => {
        this.tissues = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<ITissue>(this.tissues);
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

  removeTissue(tissue: ITissue): void {
    this.tissueService.removeSpecies(tissue.tissueId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value)
        this.removeRow(tissue);
      },
      error: err => {
        console.log(err)
      }
    })
  }

  removeRow(row: ITissue): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editTissue(tissue: ITissue): void {
    this.router.navigate(['tissues/edit'], {
      queryParams: {
        tissueId: tissue.tissueId
      }
    });
    console.log(`species name: ${tissue.tissueName}`);
  }
}
