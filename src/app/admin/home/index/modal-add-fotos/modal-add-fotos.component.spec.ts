import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddFotosComponent } from './modal-add-fotos.component';

describe('ModalAddFotosComponent', () => {
  let component: ModalAddFotosComponent;
  let fixture: ComponentFixture<ModalAddFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
