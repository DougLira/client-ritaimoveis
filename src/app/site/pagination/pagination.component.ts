import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  currentPage = 1;
  @Input('collectionSize') size;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onChangePage() {

    this.router.navigate([`/catalogo/page/${this.currentPage}`]);
  }
}
