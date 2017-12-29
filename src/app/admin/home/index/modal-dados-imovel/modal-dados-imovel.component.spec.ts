import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDadosImovelComponent } from './modal-dados-imovel.component';

describe('ModalDadosImovelComponent', () => {
  let component: ModalDadosImovelComponent;
  let fixture: ComponentFixture<ModalDadosImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDadosImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDadosImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
