const ipfsAPI = require('ipfs-http-client');
const { globSource } = require('ipfs-http-client')
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // TODO: metadata URI updates for Ceramic

  const file = await ipfs.add(globSource("./erc1155metadata", { recursive: true }))
  console.log(file.cid.toString());
  const tokenUri = "https://ipfs.io/ipfs/"+file.cid.toString()+"/{id}.json"

  await deploy("MFW", {
    from: deployer,
    args: [],
    log: true,
  });

  const mfw = await ethers.getContract("MFW", deployer);

  // Configure BaseTokenURI
  await mfw.setBaseTokenURI("");
};
module.exports.tags = ["MFW"];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/