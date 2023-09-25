import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KnobAngleCalculatorService {
  /* Mapping of target-value (between min and max)
   * to the target angle (will have same relative value between min and max).
   * This means basically applying "rule of three".
   */
  public calculateKnobAngle(
    minimum: number,
    target: number,
    maximum: number,
    angleRange: number,
    minimumRange: number
  ): number {
    // Ensure all parameters are numbers and not NaN
    const areValidNumbers = [...arguments].every(
      (arg) => typeof arg === 'number' && !isNaN(arg)
    );
    if (!areValidNumbers) {
      throw new Error('All input parameters should be valid numbers.');
    }

    const totalRange = maximum - minimum;
    if (totalRange === 0) {
      throw new Error(
        'Maximum  should not be equal to minimum .'
      );
    }

    const targetMappedToRange = target - minimum;
    const targetInPercentWithinTotalRange = targetMappedToRange / totalRange;

    const knobAngleWithoutOffset = targetInPercentWithinTotalRange * angleRange;
    const knobAngleWithOffset = knobAngleWithoutOffset + minimumRange;
    if (!isFinite(knobAngleWithOffset)) {
      throw new Error('Resulting angle is not a finite number.');
    }

    return knobAngleWithOffset;
  }
}
