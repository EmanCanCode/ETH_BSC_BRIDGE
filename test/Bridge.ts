import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Bridge Contract", () => {
  const name: string = "The Great Reset";
  const symbol: string = "TGR";
  let roleAcc: SignerWithAddress[];
  let owner: SignerWithAddress;
  let ethToken: any;
  let ethBridge: any;
  let bscToken;
  let bscBridge;

  beforeEach(async () => {
    // Contracts are deployed using the first signer/account by default
    roleAcc = await ethers.getSigners();
    owner = roleAcc[0];
    // deploy ETH contracts
    const ETHToken = await ethers.getContractFactory("ETHToken");
    ethToken = await ETHToken.deploy(name, symbol);
    const ETHBridge = await ethers.getContractFactory("ETHBridge");
    ethBridge = await ETHBridge.deploy(ethToken.address);
    // assign tokens, sets the bridge
    await ethToken.connect(owner).mint(owner.address, 1000);
    await ethToken.connect(owner).setBridge(ethBridge.address);
    // deploy BSC contracts
  });

  describe("Test", () => {
    it("Tracks the name", async () => {
      console.log("TEST: ", await ethToken.name());
      expect(await ethToken.name()).to.equal(name);
    });
    it("Tracks tokens", async () => {
      console.log(await ethToken.balanceOf(owner.address));
      console.log(await ethToken.bridge());
      console.log("ethbridge address", ethBridge.address);
    });
  });
});
