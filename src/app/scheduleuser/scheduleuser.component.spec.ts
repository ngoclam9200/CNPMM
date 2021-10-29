import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleuserComponent } from './scheduleuser.component';

describe('ScheduleuserComponent', () => {
  let component: ScheduleuserComponent;
  let fixture: ComponentFixture<ScheduleuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
