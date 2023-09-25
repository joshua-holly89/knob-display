import { TestBed } from '@angular/core/testing';

import { KnobAngleCalculatorService } from './knob-angle-calculator.service';

describe('KnobAngleCalculatorService', () => {
  let service: KnobAngleCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnobAngleCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the correct knob angle for a given target', () => {
    const result = service.calculateKnobAngle(10, 22, 50, 270, -135);
    expect(result).toBe(-54);
  });

  it('should calculate another correct knob angle for a given target', () => {
    const result = service.calculateKnobAngle(-10, 38, 60, 270, -135);
    expect(result).toBeCloseTo(50.14);
  });

  it('should throw an error if any input parameter is NaN', () => {
    expect(() => service.calculateKnobAngle(NaN, 22, 50, 270, -135)).toThrowError(
      'All input parameters should be valid numbers.'
    );
  });

  it('should throw an error if any input parameter is non-numeric', () => {
    expect(() =>
    service.calculateKnobAngle('10' as any, 22, 50, 270, -135)
    ).toThrowError('All input parameters should be valid numbers.');
  });

  it('should throw an error if maximum is equal to minimum', () => {
    expect(() => service.calculateKnobAngle(10, 22, 10, 270, -135)).toThrowError(
      'Maximum should not be equal to minimum.'
    );
  });

  it('should throw an error if resulting angle is infinite', () => {
    expect(() =>
    service.calculateKnobAngle(10, 22, 50, Number.POSITIVE_INFINITY, -135)
    ).toThrowError('Resulting angle is not a finite number.');
  });
});
