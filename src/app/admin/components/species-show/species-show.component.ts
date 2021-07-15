import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ISpecies} from '../../interfaces/ISpecies';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {SpeciesService} from '../../services/species.service';
import {ITissue} from '../../interfaces/ITissue';
import {Router} from '@angular/router';

@Component({
  selector: 'app-species-show',
  templateUrl: './species-show.component.html',
  styleUrls: ['./species-show.component.css']
})
export class SpeciesShowComponent implements OnInit, AfterViewInit {
  public species: ISpecies[];
  public dataSource: MatTableDataSource<ISpecies>;
  columnHeaders = ['speciesName', 'speciesAliases', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private speciesService: SpeciesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.speciesService.getAllSpeciesAlias().subscribe(
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
    this.speciesService.removeSpecies(species.speciesId).subscribe({
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
