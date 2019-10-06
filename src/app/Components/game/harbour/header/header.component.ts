import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/Services/web3/web3.service';
import { Web3Model } from 'src/app/Models/web3.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserAddress: string;
  Energy: number;
  Coins: number;
  Network: string;
  constructor(private web3service: Web3Service) {}

  ngOnInit() {
    this.Energy = 20;
    this.Coins = 2000;
    this.web3service.Web3Details$.subscribe((data: Web3Model) => {
      this.UserAddress = data.account;
      this.Network = data.network;
    });
  }
}
