import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComercialComponent } from './form-comercial.component';

describe('FormComercialComponent', () => {
  let component: FormComercialComponent;
  let fixture: ComponentFixture<FormComercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
