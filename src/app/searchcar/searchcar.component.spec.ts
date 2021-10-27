import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcarComponent } from './searchcar.component';

describe('SearchcarComponent', () => {
  let component: SearchcarComponent;
  let fixture: ComponentFixture<SearchcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchcarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
