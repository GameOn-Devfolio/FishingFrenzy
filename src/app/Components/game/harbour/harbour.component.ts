import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/Services/web3/web3.service';
import { Web3Model } from 'src/app/Models/web3.model';
@Component({
  selector: 'app-harbour',
  templateUrl: './harbour.component.html',
  styleUrls: ['./harbour.component.scss']
})
export class HarbourComponent implements OnInit {
  UserAddress: string;
  constructor(private web3service: Web3Service) {}

  ngOnInit() {
    this.web3service.Web3Details$.subscribe((data: Web3Model) => {
      this.UserAddress = data.account;
    });
  }
}