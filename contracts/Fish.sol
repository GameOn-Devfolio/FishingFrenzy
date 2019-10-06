pragma solidity ^0.5.0;

import './SafeMath.sol';
/**
  @title Public
  @notice Public functions are part of the contract interface and can be either called internally or via messages.
  @title View
  @notice View Function can wrap complex operations, or just provide a way to expose internal component in a safe way.
 */
contract Fish  {
    using SafeMath for uint256;
  // Structure FishModel.
    struct FishModel  {
        uint256 Rarity;
        uint256 Weight;
        address Owner;
        uint256 Price;
        // uint256 Position;
        bool OnOrder;
    }
    FishModel public ThisFish;
    // mapping (address=>FishModel) ThisFish;
    //build new fish 
    constructor(address _owner,uint256 _fishRodLevel) public   {
        ThisFish.Owner = _owner;
        ThisFish.Rarity = Rarity();//rarity of fish is selected by block gaslimit,block difficuty and apply this into math function "mod"
        ThisFish.Weight = Weight(_fishRodLevel);//weight is selected by the rod level and using the math fuction
        ThisFish.Price = Price(ThisFish.Weight,ThisFish.Rarity);//price is define by the weght and rariy
        // ThisFish.Position = 0;
        ThisFish.OnOrder = false;
    }
//rarity is selected 
    function Rarity() public view returns(uint256)  {
        if ((block.gaslimit+block.difficulty+now).mod(100)==0){
            return 3;
        }
        if ((block.gaslimit+block.difficulty+now).mod(10)==0){
            return 2;
        } else{
            return 1;
        }
    }
    function Weight(uint256 _fishRodLevel) public view returns(uint256)  {
        return _fishRodLevel.add(now.mod((_fishRodLevel*3)-1));
    }
    function Price( uint256 _weight, uint256 _rarity) public pure returns(uint256) {
        return _weight.mul(_rarity);
    }
    function GetDetails() public view returns(uint256,uint256,uint256,bool){
        return(ThisFish.Rarity,ThisFish.Weight,ThisFish.Price,ThisFish.OnOrder);
    }
    function GetOrderStatus() public view returns(bool){
        return(ThisFish.OnOrder);
    }
    function ChangeOrderStatus() public returns(bool){
        ThisFish.OnOrder=!ThisFish.OnOrder;
        return(ThisFish.OnOrder);
    }
    function ChangeOwnerShip(address newOwner) external returns(bool){
        ThisFish.Owner = newOwner;
        ChangeOrderStatus();
        return true;
    }

    }