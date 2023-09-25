import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ArgumentOutOfBoundsError } from '../errors/ArgumentOutOfBoundsError';
import { KnobAngleCalculatorService } from '../services/knob-angle-calculator/knob-angle-calculator.service';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobComponent implements OnInit, OnChanges {
  // Angles of -135 and 135 degrees are given by the min. and max. knob-markers used in the image
  private readonly MINIMUM_ANGLE = -135;
  private readonly MAXIMUM_ANGLE = 135;

  @Input()
  public minimum: number = 10;

  @Input()
  public target: number = 22;

  @Input()
  public maximum: number = 50;

  private _knobAngle: number = 0;

  public get knobAngle(): number {
    return this._knobAngle;
  }

  constructor(private knobAngleCalculatorService: KnobAngleCalculatorService){}

  ngOnInit(): void {
    this.validateGivenValues();
    this.calculateKnobAngle();
  }

  ngOnChanges(): void {
    this.calculateKnobAngle();
  }

  private validateGivenValues(): void {
    if (this.target < this.minimum) {
      throw new ArgumentOutOfBoundsError(
        `Target (${this.target}) is smaller than minimum (${this.minimum}).`
      );
    }
    if (this.target > this.maximum) {
      throw new ArgumentOutOfBoundsError(
        `Target (${this.target}) is greater than maximum (${this.maximum}).`
      );
    }
  }

private calculateKnobAngle(): void {
  this._knobAngle = this.knobAngleCalculatorService.calculateKnobAngle(
    this.minimum,
    this.target,
    this.maximum,
    this.MAXIMUM_ANGLE - this.MINIMUM_ANGLE,
    this.MINIMUM_ANGLE
  );
}
}
