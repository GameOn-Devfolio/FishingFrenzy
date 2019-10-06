import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/Services/app/app.service';
import { FishModel } from 'src/app/Models/fish.model';
import { FishService } from 'src/app/Services/fish/fish.service';
declare let window: any;
declare let web3: any;
declare let require: any;

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.scss']
})
export class PlayGroundComponent implements OnInit {
  account: any;
  newFish: FishModel = {
    id: 0,
    fish: '',
    rarity: 'soon',
    weight: 0,
    price: 0,
    onOrder: false
  };
  constructor( 
    private _appService: AppService,
    private _fishService: FishService
    ) {
  }
  Contract = this._appService.getFrenzyFishContract();

  ngOnInit() {
    this._appService.currentAccount.subscribe(accs => {
      this.account = accs;
      this.listNewFish();
    });
  }
  //Code For Fishing
  play = () => {
      this.Contract.methods
        .Fishing()
        .send({
          from: this.account,
          gas: 5000000
        })
        .then(() => {
          this.listNewFish();
        });
  }
  //Display Last ArrayFish
  listNewFish = () => {
    this.Contract.methods
    .ListAllFishes()
    .call({from: this.account})
    .then(address => {
      this.Contract.methods
      .GetFishDetails(address[address.length - 1])
      .call({from: this.account})
      .then(fish => {
      this.newFish = this._fishService.listFish(address.length - 1, address[address.length - 1], fish);
    }
    );
});
  }
}
