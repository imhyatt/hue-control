import { Component, OnInit } from '@angular/core';
import { LightsService } from '../services/lights.service';
import { Light, HsiColor } from '../services/lights.model';
import { NumberValueAccessor } from '@angular/forms';

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
      console.log(data);
      this.lights = [];
      var lightsKeys = Object.keys(data);
      for(var i=0;i<lightsKeys.length;i++){
        var light = data[lightsKeys[i]];
        // console.log(light.name);
        light.id = lightsKeys[i];
        if(light.type == 'Extended color light'){
          // light.state.hexColor = this.hsiToHex(light.state.hue, light.state.sat, light.state.bri);
        }
        this.lights.push(light);
      }
    })
  }

  togglePower(id: number, power: boolean): void {
    this.lightsService.setLightPower(id, power).subscribe(data => {
      this.getLights();
    })
  }

  setIntensity(id: number, intensity: number): void {
    this.lightsService.setLightIntensity(id, intensity).subscribe(data => {
      this.getLights();
    })
  }

  setHue(id: number, hue: number): void {
    this.lightsService.setLightHue(id, hue).subscribe(data => {
      this.getLights();
    })
  }

  setSat(id: number, sat: number): void {
    this.lightsService.setLightSat(id, sat).subscribe(data => {
      this.getLights();
    })
  }

  checkColor(hue: number, sat: number, bri: number){
    this.hsiToHex(hue, sat, bri);
  }

  hsiToHex(h: number, s: number, i: number): string {
    // Init vars
    let r: number,
      g: number,
      b: number;

    // Convert H to RGB (with full saturation)
    if(h < 10923){
      // #FF??00
      h -= 0;
      r = 100;
      g = Math.round(h/10923*100);
      b = 0;
    } else if (h < 21845) {
      // #??FF00
      h -= 10923;
      r = Math.round((1-h/10923)*100);
      g = 100;
      b = 0;
    } else if (h < 32768) {
      // #00FF??
      h -= 21845;
      r = 0;
      g = 100;
      b = Math.round(h/10923*100);
    } else if (h < 43690) {
      // #00??FF
      h -= 32768;
      r = 0;
      g = Math.round((1-h/10923)*100);
      b = 100;
    } else if (h < 54613) {
      // #??00FF
      h -= 43690;
      r = Math.round(h/10923*100);
      g = 0;
      b = 100;
    } else {
      // #FF00??
      h -= 54613;
      r = 100;
      g = 0;
      b = Math.round((1-h/10923)*100)
    }

    // Decreasing saturation increases RGB values (moving towards pure white)
    // Calculate the factor by which RGB values should increase
    s = 1-s/255;

    // Increase RGB values by S factor, but only within their margin to full
    r += Math.round((100-r)*s);
    g += Math.round((100-g)*s);
    b += Math.round((100-b)*s);

    // Decreasing intensity decreases RGB values (moving towards black)
    // Calculate the factor by which RGB values should decrease
    i /= 255;

    // Decrease RGB values by I factor
    r = Math.round(r*i);
    g = Math.round(g*i);
    b = Math.round(b*i);

    // Convert RGB values to hex
    r = Math.round(r/100*255);
    g = Math.round(g/100*255);
    b = Math.round(b/100*255);

    console.log(r);
    console.log(g);
    console.log(b);
    
    let rs: string = r.toString(16);
    console.log(rs);
    let gs: string = g.toString(16);
    console.log(gs);
    let bs: string = b.toString(16);
    console.log(bs);

    console.log('#' + rs + gs + bs);

    return '#' + rs + gs + bs;
  }

  hexToHsi(hex: string): HsiColor {
    let rs: string = "0x" + hex.substr(1, 2);
    let gs: string = "0x" + hex.substr(3, 2);
    let bs: string = "0x" + hex.substr(5, 2);

    // Then to HSL
    let r: number = parseInt(rs) / 255;
    let g: number = parseInt(gs) / 255;
    let b: number = parseInt(bs) / 255;
    let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      i = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    i = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * i - 1));
    s = +(s * 100).toFixed(1);
    i = +(i * 100).toFixed(1);

    return {
      h: h,
      s: s,
      i: i
    }
  }

  xyBriToHex(x: number, y: number, bri: number): string {
    let z: number = 1.0 - x - y;

    let Y: number = bri / 255.0; // Brightness of lamp
    let X: number = (Y / y) * x;
    let Z: number = (Y / y) * z;
    let r: number = X * 1.612 - Y * 0.203 - Z * 0.302;
    let g: number = -X * 0.509 + Y * 1.412 + Z * 0.066;
    let b: number = X * 0.026 - Y * 0.072 + Z * 0.962;
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
    let maxValue: number = Math.max(r,g,b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;

    r = r * 255;
    if (r < 0) { r = 255 };

    g = g * 255;
    if (g < 0) { g = 255 };

    b = b * 255;
    if (b < 0) { b = 255 };

    let rs: string = Math.round(r).toString(16);
    let gs: string = Math.round(g).toString(16);
    let bs: string = Math.round(b).toString(16);

    if (rs.length < 2) rs="0"+r;        
    if (gs.length < 2) gs="0"+g;        
    if (bs.length < 2) bs="0"+r;        
    let rgb: string = "#"+r+g+b;

    return rgb;
  }

}
