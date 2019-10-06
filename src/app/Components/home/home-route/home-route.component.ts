import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/Services/web3/web3.service';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.scss']
})
export class HomeRouteComponent implements OnInit {
  constructor(private route: Router, private web3service: Web3Service) {}

  ngOnInit() {}

  login = async () => {
    await this.web3service.web3login();
    this.route.navigateByUrl('/Harbour');
  }
}
