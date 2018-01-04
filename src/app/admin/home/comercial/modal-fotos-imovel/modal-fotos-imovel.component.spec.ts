import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFotosImovelComponent } from './modal-fotos-imovel.component';

describe('ModalFotosImovelComponent', () => {
  let component: ModalFotosImovelComponent;
  let fixture: ComponentFixture<ModalFotosImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFotosImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFotosImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
