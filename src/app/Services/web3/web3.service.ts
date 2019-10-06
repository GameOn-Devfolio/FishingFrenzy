import { AppService } from 'src/app/Services/app/app.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { Web3Model } from '../../Models/web3.model';
declare let require: any;

const Web3 = require('web3');
declare let window: any;
declare let ethereum: any;
declare let web3: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  constructor( private _appService: AppService) {}
  public Web3Details$: BehaviorSubject<Web3Model> = new BehaviorSubject<
    Web3Model
  >({
    account: null,
    network: null
  });
  RefreshedAccount = interval(1000);
  private AccountSubscription: Subscription;
  public async web3login() {
    return new Promise(async (resolve, reject) => {
      // check dapp browser
      if (window.ethereum || window.web3) {
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum);
          try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
          } catch (error) {
            // User denied account access...
            reject(error);
          }
        } else {
          window.web3 = new Web3(web3.currentProvider);
          // Acccounts always exposed
          // web3.eth.sendTransaction({
          //   /* ... */
          // });
        }
        this.AccountSubscription = this.RefreshedAccount.subscribe(async () => {
          let Account = await this.GetAccount();
          const Network = await this.GetNetwork();
          if (Account == null) {
            Account = null;
          }
          // const ContractJSON = require('../../../../build/contracts/FrenzyFish.json');
          // const contractsAddress = ContractJSON.networks['5777'].address;
          // const abi = ContractJSON.abi;
          // const Contract = new window.web3.eth.Contract(abi, contractsAddress);
          // Contract.methods
          //   .ListAllFishes()
          //   .call()
          //   .then(s => {
          //     console.log(s);
          //   });
          this.Web3Details$.next({
            account: Account,
            network: Network
          });
          resolve('Logged In');
        });
      } else {
        reject(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
      }
    });
  }
  public async web3logout() {
    this.AccountSubscription.unsubscribe();
    this.Web3Details$.next({
      account: null,
      network: null
    });
  }
  private async GetAccount(): Promise<string> {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          reject('There was an error fetching your accounts.');
        }

        // Get the initial account balance so it can be displayed.
        if (accs.length === 0) {
          reject(
            'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
          );
        } else {
          this._appService.updateAccount(accs[0]);
          resolve(accs[0]);
        }
      });
    });
  }
  private GetNetwork(): Promise<string> {
    return new Promise((resolve, reject) => {
      window.web3.eth.net.getId((err, netId) => {
        if (err) {
          reject('Something Went Wrong, while getting network ID ');
        }
        switch (netId) {
          case 1:
            resolve('Main');
            break;
          case 3:
            resolve('Ropsten');
            break;
          case 42:
            resolve('Kovan');
            break;
          case 4:
            resolve('Rinkeby');
            break;
          default:
            resolve(null);
        }
      });
    });
  }
}
