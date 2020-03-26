import { Component, OnInit } from '@angular/core';
import { LightsService } from '../services/lights.service';
import { Light } from '../services/lights.model';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})

export class LightsComponent implements OnInit {

  constructor(protected lightsService: LightsService) { };

  lights: Light[] = [];

  ngOnInit(): void {
    this.getLights();
  }

  getLights() {
    this.lightsService.getLights().subscribe(data => {

      var lightsKeys = Object.keys(data);
      for(var i=0;i<lightsKeys.length;i++){
        var light = data[lightsKeys[i]];
        this.lights.push(light);
      }
      console.log(this.lights);
    })
  }


}
