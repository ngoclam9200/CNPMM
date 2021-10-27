import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcompanycarComponent } from './listcompanycar.component';

describe('ListcompanycarComponent', () => {
  let component: ListcompanycarComponent;
  let fixture: ComponentFixture<ListcompanycarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcompanycarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcompanycarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
