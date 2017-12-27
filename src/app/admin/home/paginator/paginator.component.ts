import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatPaginatorIntl, PageEvent} from '@angular/material';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent extends MatPaginatorIntl implements OnInit {

  itemsPerPageLabel = 'Itens por página:';
  nextPageLabel     = 'Próxima';
  previousPageLabel = 'Anterior';

  @Input() length;

  @Output() pageEvent = new EventEmitter<PageEvent>();

  constructor() {
    super()
  }

  ngOnInit() {
  }

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };

  onPageChanges(event){

    this.pageEvent.emit(event);
  }

}
