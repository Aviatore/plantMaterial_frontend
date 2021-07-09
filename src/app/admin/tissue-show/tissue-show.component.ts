import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TissueService} from '../services/tissue.service';
import {Observable} from 'rxjs';
import {Tissue} from '../interfaces/tissue';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tissue-show',
  templateUrl: './tissue-show.component.html',
  styleUrls: ['./tissue-show.component.css']
})
export class TissueShowComponent implements OnInit, AfterViewInit {
  public tissues: Tissue[];
  public dataSource: MatTableDataSource<Tissue>;
  columnHeaders = ['tissueName', 'action'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private tissueService: TissueService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.tissueService.getAllTissues().subscribe({
      next: result => {
        this.tissues = result;
        console.log(result);

        this.dataSource = new MatTableDataSource<Tissue>(this.tissues);
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

  removeTissue(tissue: Tissue): void {
    return;
  }
}
