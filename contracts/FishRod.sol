pragma solidity ^0.5.0;


import './SafeMath.sol';
// import './SafeMath.sol';
 // Structure FishRod.
contract FishRod {
    using SafeMath for uint256;
    struct  Rod{
        uint256 Level;
        uint256 Power;
        uint256 CurrentPrice;
        uint256 NextPrice;
    }
    // Mapping is done into structure "Rod" with "UsersRod" as mapping key.
    mapping (address=>Rod) public UsersRod;

    //Asign InitialRod property
    function FirstUserInitialRod() public returns(bool){
        if(UsersRod[msg.sender].Level == 0){
        UsersRod[msg.sender].Level = 1;
        UsersRod[msg.sender].Power = 3;
        UsersRod[msg.sender].CurrentPrice = 255;
        UsersRod[msg.sender].NextPrice = 385;
        return true;
    }
    return false;
    }
      //Upgrade fishrod property
    function UpgradeFishRod() public{
        assert(UsersRod[msg.sender].Level!=0);
        uint256 Price = UsersRod[msg.sender].NextPrice;
        UsersRod[msg.sender].Level = UsersRod[msg.sender].Level.add(1);
        UsersRod[msg.sender].Power = UsersRod[msg.sender].Power.add(2);
        UsersRod[msg.sender].NextPrice = UsersRod[msg.sender].NextPrice.add(UsersRod[msg.sender].CurrentPrice);
        UsersRod[msg.sender].CurrentPrice = Price;
    }
    function GetRodDetails() public view returns(uint256 _level,uint256 _power,uint256 _price){
        return(UsersRod[msg.sender].Level,UsersRod[msg.sender].Power,UsersRod[msg.sender].NextPrice);
    }
}