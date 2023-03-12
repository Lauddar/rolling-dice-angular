import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRateComponent } from './success-rate.component';

describe('SuccessRateComponent', () => {
  let component: SuccessRateComponent;
  let fixture: ComponentFixture<SuccessRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
