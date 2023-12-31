import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnobComponent } from './knob.component';

describe('KnobComponent', () => {
  let component: KnobComponent;
  let fixture: ComponentFixture<KnobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnobComponent]
    });
    fixture = TestBed.createComponent(KnobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
