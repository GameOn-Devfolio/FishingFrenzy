pragma solidity ^0.5.0;
import './Fish.sol';
import './FishRod.sol';
import './Market.sol';
contract FrenzyFish is FishRod,Market{
  // Constructor
    constructor () public {
    }

 // Function to Fishing a new Fish into Structure "FishModel" with reference to msg.sender .
    function Fishing() public returns(address){
        require(UsersRod[msg.sender].Level != 0,"Rod Must be Needed");
        address newfish = address(new Fish(msg.sender,UsersRod[msg.sender].Level));
        Fishes[msg.sender].push(newfish);
        return newfish;
    }
    //function to list all the fish of an account
     function ListAllFishes() public view returns(address[] memory) {
         return Fishes[msg.sender];
     }
      //function to get the details of a fish
        function GetFishDetails(address fish) public view returns(uint256 _rarity,uint256 _weight,uint256 _price,bool _onOrder){
        return Fish(fish).GetDetails();
    }


    // function RechargeUsingFish(address _Fish,uint256 _position) public{

    // }

}