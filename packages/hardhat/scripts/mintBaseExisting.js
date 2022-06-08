const { ethers, getNamedAccounts } = require("hardhat");

const { BigNumber } = ethers;

const delayMS = 1000;

const main = async () => {
  const { deployer } = await getNamedAccounts();
  const toAddress = "0x08749a19797531979654D8384112353c7F046aC5"; // Rinkeby giveaway contract

  console.log("\n\n 🎫 Minting to base existing " + toAddress + "...\n");
  const mfw = await ethers.getContract("MFW", deployer);

  // ERC1155
  const mintBaseExistingErc1155 = async (toArray, tokenIdArray, amountArray) =>
    mfw.mintBaseExisting(toArray, tokenIdArray, amountArray);

  // generate dummy NFTs for an existing ID and base and give to toAddress

  for (i = 1; i < 6; i++) {
    await mintBaseExistingErc1155(
      [toAddress], // To
      [BigNumber.from(i)], // ID: in order to work this ID must already have been minted!
      [BigNumber.from("20")], // Desired supply
      [""], // The "base"
      {
        gasLimit: 400000,
      }
    );
  }
  for (i = 6; i < 21; i++) {
    await mintBaseExistingErc1155(
      [toAddress], // To
      [BigNumber.from(i)], // ID: in order to work this ID must already have been minted!
      [BigNumber.from("10")], // Desired supply
      [""], // The "base"
      {
        gasLimit: 400000,
      }
    );
  }
  // const balance = await mfw.balanceOf(toAddress, BigNumber.from("1"));
  // console.log("Balance", balance.toNumber());

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(delayMS);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
