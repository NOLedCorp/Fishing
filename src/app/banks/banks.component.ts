import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FishingService } from '../services/fishing.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less']
})
export class BanksComponent implements OnInit {

  
  constructor(public ms:ModalService, public fs:FishingService, public us:UserService) { }

  ngOnInit() {
  }
}
