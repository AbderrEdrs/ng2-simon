import {Component, Input, OnChanges} from '@angular/core';
const {Board} = require('johnny-five');

const sevenSegmentAddress = 0x71;

@Component({
  'selector': 'iot-seven-segment',
  'template': ''
})
export class SevenSegmentComponent implements OnChanges {
  @Input() value: string | number = null;
  private io; // initialized by Board.Component

  constructor() {
    Board.Component.call(this, {});
    this.io.i2cConfig({});
  }

  ngOnChanges() {
    if (this.value !== null) {
      const chars = this.value.toString().substr(0, 4).split('').map(letter => letter.charCodeAt(0));
      try {
        this.io.i2cWrite(sevenSegmentAddress, [0x76, ...chars]);
      } catch (e) {
        console.log('Error: I2C Write failed', e.toString());
      }
    }
  }
}
