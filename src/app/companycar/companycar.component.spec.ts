import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanycarComponent } from './companycar.component';

describe('CompanycarComponent', () => {
  let component: CompanycarComponent;
  let fixture: ComponentFixture<CompanycarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanycarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanycarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
