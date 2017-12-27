import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResidencialComponent } from './form-residencial.component';

describe('FormResidencialComponent', () => {
  let component: FormResidencialComponent;
  let fixture: ComponentFixture<FormResidencialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResidencialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResidencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
