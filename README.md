# FishingFrenzy 
[Live Link](https://fishingfrenzy-rinkeby.netlify.com/)

To view in Matic explorer:
Deployed Contract Address: 0x70Bb0D7FAdAB5ecdc2A636462200eC71e47331b4

[Matic Explorer Link](https://explorer.testnet2.matic.network/address/0x70bb0d7fadab5ecdc2a636462200ec71e47331b4/transactions)


[Video Demo](https://youtu.be/SnMnXaY3r0M)

*Please refer to the [PDF](https://github.com/GameOn-Devfolio/FishingFrenzy/blob/master/FishingFrenzy-GameOasis.pdf) for updated documentation regarding the application!*


FishingFrenzy is a multiplayer game, built as a decentralized application on the Ethereum blockchain.
Players can collect (by fishing), fight (battle) and grow (breeding) crypto-fish tokens to dominate the “decentralized FrenzyVerse” (in development). Each Fish has a unique name, a unique image and unique characteristics as an ERC-721 token (to be developed) stored in the Ethereum network that can be sold or transferred just like any other NFT.

## Requirements

- Ubuntu
- Build-essential packages
- [Node.js](https://nodejs.org/) Version 10.15.3
- Angular 8
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
- [Geth](https://www.trufflesuite.com/docs/truffle/overview)
- MetaMask Enabled Browser

## Setting Up:

**Step 1:** Download the repostory using the command:

```
 git clone "git@github.com:GameOn-Devfolio/FishingFrenzy.git"
 cd FishingFrenzy
```

**Step 2:** Install the dependecies using the command:

```
 npm Install
```
**Step 3:** Use the following command to run Smart Contract (follow one of the below, and then move to Step 4):

**Run On Matic **
```
truffle migrate --network matic --reset
```

**Run On Private Network**


 Use the following command to run the Geth(Proof Of Authority (Clique)):


 nano node/genesis.json

 
 Add needed alloc address and prefund
 NOte: Don't Change First Alloc Address
 
 
```
cd node
chmod +x ./genesisInit.sh
chmod +x ./geth.sh

./genesisInit.sh
./geth.sh
cd ..
truffle migrate --reset
```




**Run On Public Network**
Use the following Steps For Run Smart Contract In Ropsten (Proof Of Work) and Rinkeby (Proof Of Authority) :


nano truffle-config.js

change infuraKey

nano ./secret

add your mnemonics words

nano src/app/Services/app/app.service.ts

go to line 11

change networkid to 3 for Ropsten and 4 for Rinkeby

truffle deployment for Ropsten Network
```
truffle migrate --network ropsten
```
truffle deployment for Rinkeby Network
```
truffle migrate --network rinkeby
```



**Step 4:** Running Angular App
Open New Terminal
```
ng s -o
```


it will Automaticaly Open http://localhost/4200 in browser
Connet with Metamask 
Enjoy!!!!!!

check video demonstration [here](https://youtu.be/SnMnXaY3r0M)




## Optional Settings:

to run test case
New Terminal
```
truffle test ./test/FishingFrenzy.js
```


Deployed Contract of Ropsten Network: 0x9ae312022f9ec4b706d79b2AFcadf749f2E0EeD7


[Ropsten Live Link](https://fishingfrenzy-rinkeby.netlify.com/)



Depolyed Contract of Rinkeby Network: 0xf65d21bEe00e431bFA109dDa97c0B56Fd32e3d13



[Rinkeby Live Link](https://fishingfrenzy-ropsten.netlify.com/)



We Don't Stop From here....



## Upcoming Features
- Implementing Docker.
- Ether Payment Support.
- ERC20 Token Support.
- Fish Recharging.
- Admin Panel.
- Migrating To ERC721 Fish Tokens from Fish Contracts.
- Fish Biding Support.
- Fish Battle Arena.
- implementing New featured Fishrods.
- Aquarium for Fish breeding. 
- New Web Ui with Rich Graphic Support.
- Introducing Mobile App. 
- Original Fish API.
- Introducing Legendary and Seasonal Fishes which Have Unique DNA. 
- VIP Club. (increasing the chance of Epic Fishes) 
- And So on ... Stay Tuned.........
