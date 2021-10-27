import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaboutComponent } from './editabout.component';

describe('EditaboutComponent', () => {
  let component: EditaboutComponent;
  let fixture: ComponentFixture<EditaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
