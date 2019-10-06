const FrenzyFish = artifacts.require('FrenzyFish');
const FishContract = artifacts.require('Fish');
const FishRodContract = artifacts.require('FishRod');
const MarketContract = artifacts.require('Market');

contract('FrenzyFish', async accounts => {
    let frenzyFish;

    //Deploying Contracts For Testing
    beforeEach('setup contract for each test', async function() {
      frenzyFish = await FrenzyFish.deployed();
    });
    
    //Check Initial Rod Status
    it('should initial fishrod mustbe level 1', async function() {
      await frenzyFish.FirstUserInitialRod();
      const fishrodDetails = await frenzyFish.GetRodDetails();
      assert.equal(fishrodDetails._level, 1, "Fishrod not Initilsied");
    });
    
    //Check Fishing Status
    it('should fishing correctly', async function() {
      const UserFishesBefore = await frenzyFish.ListAllFishes();
      await frenzyFish.FirstUserInitialRod();
      await frenzyFish.Fishing();
      const UserFishesAfter = await frenzyFish.ListAllFishes();
      assert.equal(UserFishesAfter.length - UserFishesBefore.length , 1,'Fish address not stored');
    });
    
    //Check Fish have Owner
    it('should fish have owner', async function() {
      await frenzyFish.FirstUserInitialRod();
      const UserFishesBefore = await frenzyFish.ListAllFishes();
      await frenzyFish.Fishing();
      const UserFishesAfter = await frenzyFish.ListAllFishes();
      assert.equal(UserFishesAfter.length - UserFishesBefore.length , 1,'Fish address not stored');
      const LastFish = UserFishesAfter.pop();
      const Fish = await FishContract.at(LastFish);
      const FishDetails = await Fish.ThisFish();
      assert.equal(FishDetails.Owner, accounts[0],'user is not fish Owner');
    });
    
    //Check Fish not in Order Status
    it('should fish not in sell order', async function() {
      await frenzyFish.FirstUserInitialRod();
      await frenzyFish.Fishing();
      const UserFishesAfter = await frenzyFish.ListAllFishes();
      const LastFish = UserFishesAfter.pop();
      const Fish = await FishContract.at(LastFish);
      const FishDetails = await Fish.ThisFish();
      assert.equal(FishDetails.OnOrder,false,'Fish Must be On self');
    });
  });