import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {HomeAdminService} from '../../home-admin.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  msg: Message[] = [];

  constructor(private homeService: HomeAdminService) {
  }

  ngOnInit() {

    this.homeService.message.subscribe(msg => {
      this.msg = [];
      this.msg.push(msg);
      setTimeout(() => this.msg = [], 3000);
    });
  }

}
