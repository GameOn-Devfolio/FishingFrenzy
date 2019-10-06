const FrenzyFish = artifacts.require("./FrenzyFish.sol");

module.exports = function (deployer) {
deployer.deploy(FrenzyFish);
};