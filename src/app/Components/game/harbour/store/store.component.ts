import { FishService } from './../../../../Services/fish/fish.service';
import { AppService } from './../../../../Services/app/app.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FishModel } from 'src/app/Models/fish.model';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements  OnInit {

  Contract: any;
  fishes: FishModel[] = [];
  rod: any = [];
  tempf: FishModel[] = [];
  account: any;
  constructor(
    private _appService: AppService,
    private _fishService: FishService) {
  }


  ngOnInit() {
    this.Contract = this._appService.getFrenzyFishContract();
    this._appService.currentAccount.subscribe(accs => {
      this.account = accs;
    });
    this._appService.currentFishStoreList.subscribe(fish => {
      this.fishes = [];
      this.fishes = fish;
    });
    this.listingFishData();
    this.listingRodDta();
  }
//Listing FishData
  listingFishData = () => {
    let count = 0;
    let fcount = 0;
    this.Contract.methods
      .ListAllFishes()
      .call({from: this.account})
      .then((address: []) =>{
        address.forEach(async (item: any) => {
          await this.Contract.methods
          .GetFishDetails(item)
          .call({from: this.account})
          .then((fish: any) => {
            if ( !fish._onOrder) {
              this.tempf[fcount] =  this._fishService.listFish(count, item, fish);
              fcount++;
            }
            count++;
          }
          );
        })
        this._appService.updateFishStoreList(this.tempf);
      }
      );
  }

//Listing FishRod
  listingRodDta = () => {
    this.Contract.methods
    .GetRodDetails()
   .call({from: this.account})
   .then((rodData: any) => {
    this.rod = rodData;
  });
  }
  //initilise Fish Rod
  firstFishRod = () => {
      this.Contract.methods
        .FirstUserInitialRod()
        .send({
          from: this.account,
          gas: 5000000
        })
        .then(() => {
          this.listingRodDta();
        });
  }
  //Upgrade Fish Rod
  upgradeFishrod() {
      this.Contract.methods
        .UpgradeFishRod()
        .send({
          from: this.account,
          gas: 5000000
        })
        .then(() => {
          this.listingRodDta();
        });

  }
  recharge = (fish: FishModel) => {
    alert('Coming Soon.. WIll be Available on Next Update....');
  }
//Sell A Fish
  sellFish = (fish: FishModel) => {
    console.log(fish);
    this.Contract.methods
    .SellFish(fish.fish, fish.id)
    .send({
      from: this.account,
      gas: 3000000
    })
    .then(success => {
      if (success.status) {
        alert('Sell Order Placed SuccessFully')
      }
    } );
  }
}
