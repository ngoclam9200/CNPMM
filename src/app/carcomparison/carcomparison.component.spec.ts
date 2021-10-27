import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarcomparisonComponent } from './carcomparison.component';

describe('CarcomparisonComponent', () => {
  let component: CarcomparisonComponent;
  let fixture: ComponentFixture<CarcomparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarcomparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarcomparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
