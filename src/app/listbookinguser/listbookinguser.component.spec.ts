import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbookinguserComponent } from './listbookinguser.component';

describe('ListbookinguserComponent', () => {
  let component: ListbookinguserComponent;
  let fixture: ComponentFixture<ListbookinguserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbookinguserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbookinguserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
