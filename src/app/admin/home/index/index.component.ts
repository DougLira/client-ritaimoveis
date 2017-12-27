import {Component, OnDestroy, OnInit} from '@angular/core';

import {HomeAdminService} from '../home-admin.service';
import {Imovel} from '../../../models/imovel';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  private subscriptionImoveis: Subscription;
  private subscriptionPages: Subscription;
  private subscriptionDelete: Subscription;
  imoveis: Imovel[];
  paginator = {
    length: ''
  };

  constructor(private homeService: HomeAdminService) {
  }


  ngOnInit() {


    this.subscriptionImoveis = this.homeService.getImoveis()
      .subscribe(res => {

        if (res.status == 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  ngOnDestroy() {

    this.subscriptionImoveis.unsubscribe();
    if (this.subscriptionPages) this.subscriptionPages.unsubscribe();
    if (this.subscriptionDelete) this.subscriptionDelete.unsubscribe();
  }

  onPageChanges(event) {

    let page: string = event.pageIndex + 1;
    this.subscriptionPages = this.homeService.getImoveis(page)
      .subscribe(res => {

        if (res.status == 200) {

          this.imoveis = res.body.content;
          this.paginator.length = res.body.collectionSize;
        } else {

        }
      });
  }

  delete(imovel) {

    this.subscriptionDelete = this.homeService.deleteImovel(imovel._id)
      .subscribe(res => {

        this.subscriptionImoveis = this.homeService.getImoveis()
          .subscribe(res => {

            if (res.status == 200) {

              this.imoveis = res.body.content;
              this.paginator.length = res.body.collectionSize;
            } else {

            }
          });
      });
  }

}
