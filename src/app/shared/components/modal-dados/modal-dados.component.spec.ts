import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDadosComponent } from './modal-dados.component';

describe('ModalDadosComponent', () => {
  let component: ModalDadosComponent;
  let fixture: ComponentFixture<ModalDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
