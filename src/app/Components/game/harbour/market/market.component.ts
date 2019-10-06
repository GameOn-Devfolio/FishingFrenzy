
import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/app/Services/app/app.service';
import { FishModel } from 'src/app/Models/fish.model';
import { FishService } from 'src/app/Services/fish/fish.service';
import { OrderModel } from 'src/app/Models/order.model';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  Contract: any;
  account: any;
  BuyOrderFishes: OrderModel[] = [];
  MyOrderFishes: OrderModel[] = [];
  tempf: OrderModel[] = [];
  constructor(
    private _appService: AppService,
    private _fishService: FishService) {
  }

  ngOnInit() {
    this.Contract = this._appService.getFrenzyFishContract();
    this._appService.currentAccount.subscribe(accs => {
      this.account = accs;
    });
    this._appService.currentBuyOrderList.subscribe(fish => {
      this.BuyOrderFishes = [];
      this.BuyOrderFishes = fish;
    });
    this._appService.currentMyOrderList.subscribe(fish => {
      this.MyOrderFishes = [];
      this.MyOrderFishes = fish;
    });
    this.Orders();
  }
   Orders() {
    this.Contract.methods
    .ListMarketOrders()
    .call({from: this.account})
    .then(async (Orders: { [s: string]: {}; } | ArrayLike<{}>) => {
      this.tempf =  this._fishService.listOrders(Orders);
      this.listingBuyOrders(this.tempf);
      this.listingMyOrders(this.tempf);
      });
    }
//Listing All From OrderList
listingBuyOrders(order: OrderModel[])  {
   let buyOrder: OrderModel[] = [];
   let index = 0;
   new Promise((resolve) => {
     this.Contract.methods
     .ListAllFishes()
      .call({from: this.account})
      .then((( fishes: any) => {
      if (fishes.length == 0) {
        resolve(order);
      } else {
        fishes.forEach((fishAddress: any) => {
        for (const orderfish of order) {
          this.Contract.methods
          .GetFishDetails(fishAddress)
          .call({from: this.account})
          .then((fish: any) => {
            if (fishes.indexOf(orderfish.fish) == -1) {
              if (buyOrder.indexOf(orderfish) == -1) {
                buyOrder[index] = orderfish;
                index++;
              }
            }
          });
        }
          });
      resolve(buyOrder);
      }}));
    }).then((result: OrderModel[] ) => {

      this._appService.updateBuyOrderList(result);
    }
    );
  }
//Listing All From MYOrderList
listingMyOrders(order: OrderModel[])  {
   let cancelOrder: OrderModel[] = [];
   let index = 0;
   new Promise((resolve) => {
     this.Contract.methods
     .ListAllFishes()
      .call({from: this.account})
      .then((( fishes: any) => {
      if (fishes.length == 0) {
        resolve(order);
      } else {
      fishes.forEach((fishAddress: any) => {
        for (const orderfish of order) {
          this.Contract.methods
          .GetFishDetails(fishAddress)
          .call({from: this.account})
          .then((fish: any) => {
            if (fishes.indexOf(orderfish.fish) >= 0 && fish._onOrder) {
              if (cancelOrder.indexOf(orderfish) == -1) {
                cancelOrder[index] = orderfish;
                index++;
              }
            }
          });
        }
          });
      resolve(cancelOrder);
      }}));
    }).then((result: OrderModel[] ) => {

      this._appService.updateMyOrderList(result);
    }
    );
  }
//CancelFish From Order
cancelOrder = (fish: OrderModel) => {
    console.log(fish);
    console.log(fish.fish, fish.orderid);
    this.Contract.methods
    .CancelSellFishOrder(fish.fish, fish.orderid - 1)
    .send({
      from: this.account,
      gas: 5000000
    }).then((success: any) => {
      console.log(success);
  });
}

//BuyFish From Order
buyFish = (fish: OrderModel) => {
    console.log(fish);
    this.Contract.methods
    .BuyFish(fish.fish, fish.orderid-1)
    .send({
      from: this.account,
      gas: 5000000
    }).then((success: any) => {
      console.log(success);
  });
}

}
