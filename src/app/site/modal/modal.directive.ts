import {Directive, OnInit} from '@angular/core';

@Directive({
  selector: '[modalResidencial]'
})
export class ModalDirective implements OnInit{

  constructor() {
  }

  public close(){

    document.getElementById('simpleModal').style.display = 'none';
  }

  public outsideClick(event){

    if (event.target == document.getElementById('simpleModal')) {
      document.getElementById('simpleModal').style.display = 'none';
    }
  }

  ngOnInit(){

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', this.close);
    window.addEventListener('click', this.outsideClick);
  }
}
