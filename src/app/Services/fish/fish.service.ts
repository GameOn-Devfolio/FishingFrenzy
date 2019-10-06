
import { Injectable } from '@angular/core';
import { FishModel } from 'src/app/Models/fish.model';
import { OrderModel } from 'src/app/Models/order.model';
import { AppService } from '../app/app.service';

@Injectable({
  providedIn: 'root'
})
export class FishService {
  Contract: any;
  account: any;
  constructor(private _appService: AppService) { 
    this.Contract = this._appService.getFrenzyFishContract();
    this._appService.currentAccount.subscribe(accs => {
      this.account = accs;})
    }

    /** Builds and returns a fish. */
    listFish(count: number, fishAddress: string, fish: { _rarity: string; _weight: number; _price: number; _onOrder: boolean}): FishModel {
      return {
        id: count,
        fish: fishAddress,
        rarity: fish._rarity,
        weight: fish._weight,
        price: fish._price,
        onOrder: fish._onOrder
      };
    }

  /** Builds and returns a Order. */
    listOrder(count: number,
              fish: any,
              fishDetails: { _rarity: string; _weight: number; _price: number; _onOrder: boolean},
              sellerAddress: string,
              ownerFishPosition: number,
              isFilled: boolean): OrderModel {
      return {
        orderid: count + 1,
        fish,
        rarity: fishDetails._rarity,
        weight: fishDetails._weight,
        price: fishDetails._price,
        seller: sellerAddress,
        ownerFishPosition,
        isFilled
      };
    }
    listOrders(Orders: { [s: string]: {}; } | ArrayLike<{}>): OrderModel[] {
      const Order: OrderModel[] = [];
      const fish: any = Object.entries(Orders)[0][1];
      const seller = Object.entries(Orders)[1][1];
      const ownerFishPosition = Object.entries(Orders)[2][1];
      const isFilled = Object.entries(Orders)[3][1];
      for (let i = 0; i <= fish.length; i++) {
          if (!(fish[i] == 0x0000000000000000000000000000000000000000 || !fish[i])) {
            this.Contract.methods
            .GetFishDetails(fish[i])
            .call()
            .then((fishDetails: any)  => Order
            .push(this.listOrder(i, fish[i], fishDetails, seller[i], ownerFishPosition[i], isFilled[i])));
          }
        }
      return Order;
    }
}
