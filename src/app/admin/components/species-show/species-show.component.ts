import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISpecies} from '../../interfaces/ISpecies';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {SpeciesService} from '../../services/species.service';
import {ITissue} from '../../interfaces/ITissue';
import {Router} from '@angular/router';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-species-show',
  templateUrl: './species-show.component.html',
  styleUrls: ['./species-show.component.css']
})
export class SpeciesShowComponent implements OnInit, AfterViewInit, OnDestroy {
  public species: ISpecies[];
  public dataSource: MatTableDataSource<ISpecies>;
  componentDestroyed: Subject<any>;
  columnHeaders = ['speciesName', 'speciesAliases', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private speciesService: SpeciesService,
              private router: Router) { }

  ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

  ngOnInit(): void {
    this.componentDestroyed = new Subject();
  }

  ngAfterViewInit(): void {
    this.speciesService.getAllSpeciesAlias().pipe(takeUntil(this.componentDestroyed)).subscribe(
      {
        next: value => {
          this.species = value;
          this.dataSource = new MatTableDataSource<ISpecies>(value);
          this.dataSource.sort = this.sort;
        },
        error: error => {
          console.log(error);
        }
      }
    );
  }

  applyFilter(value: string): void {
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  removeSpecies(species: ISpecies): void {
    this.speciesService.removeSpecies(species.speciesId).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        console.log(value.body);
        this.removeRow(species);
      },
      error: err => {
        console.log(`Error: ${err}`);
      }
    });
  }

  removeRow(row: ISpecies): void {
    const index = this.dataSource.data.findIndex(p => p === row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  editSpecies(species: ISpecies): void {
    this.router.navigate(['species/edit'], {
      queryParams: {
        speciesId: species.speciesId
      }
    });
    console.log(`species name: ${species.speciesName}`);
  }
}
