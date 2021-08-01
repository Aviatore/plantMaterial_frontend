import {Component, Input, OnInit} from '@angular/core';
import {IPrepLocation} from "../../interfaces/IPrepLocation";

@Component({
  selector: 'app-prep-label',
  templateUrl: './prep-label.component.html',
  styleUrls: ['./prep-label.component.css']
})
export class PrepLabelComponent implements OnInit {
  @Input('prepData') prepData: IPrepLocation;
  bgColor: string;

  constructor() { }

  ngOnInit(): void {
    switch (this.prepData.prepTypeName) {
      case 'DNA':
        this.bgColor = '#43a0db';
        break;
      case 'RNA':
        this.bgColor = '#00d000';
        break;
      case 'Protein':
        this.bgColor = 'chocolate'
        break;
    }
  }

}
