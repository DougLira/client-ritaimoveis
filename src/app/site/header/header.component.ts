import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  toggleNavbar() {
    const cabecalho = document.getElementById('cabecalho');
    if (cabecalho.className === 'cabecalho') {
      cabecalho.className += ' responsive';
    } else {
      cabecalho.className = 'cabecalho';
    }
  }

  linkClick() {
    const cabecalho = document.getElementById('cabecalho');
    if (cabecalho.className === 'cabecalho responsive') {
      cabecalho.className = 'cabecalho';
    }
  }
}
