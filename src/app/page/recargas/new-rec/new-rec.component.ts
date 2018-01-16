import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-rec',
  templateUrl: './new-rec.component.html',
  styleUrls: ['./new-rec.component.scss']
})
export class NewRecComponent implements OnInit {
  starRate = 2;
  heartRate = 4;

  constructor() { }

  ngOnInit() {
  }

}
