import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('clicker', [
      state('closed', style({
        height: 0,
        overflow: 'hidden'
      })),
      state('opened', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('closed => opened', [
        animate('500ms ease-in-out')
      ]),
      transition('opened => closed', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  plantSamples: string;

  constructor() { }

  ngOnInit(): void {
    this.plantSamples = 'closed';
  }

  plantSampleTrigger(): void {
    this.plantSamples = this.plantSamples === 'closed' ? 'opened' : 'closed';
  }
}
