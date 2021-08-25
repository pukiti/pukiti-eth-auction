/* eslint no-use-before-define: "warn" */
import { ethers } from "hardhat";
import chalk from "chalk";
import fs from "fs";
import { utils, Contract } from "ethers";
import { hasPath } from "ramda";

const main = async () => {
  console.log("\n\n 📡 Deploying...\n");

  // read in all the assets to get their IPFS hash...
  let uploadedAssets = JSON.parse(
    fs.readFileSync("./uploaded.json") as unknown as string
  );
  let bytes32Array = [];
  for (let a in uploadedAssets) {
    console.log(" 🏷 IPFS:", a);
    let bytes32 = utils.id(a);
    console.log(" #️⃣ hashed:", bytes32);
    bytes32Array.push(bytes32);
  }
  console.log(" \n");

  // deploy the contract with all the artworks forSale
  const yourCollectible = await deploy("YourCollectible", [bytes32Array]); // <-- add in constructor args like line 19 vvvv
  const auction = await deploy("Auction", []); // <-- add in constructor args like line 19 vvvv

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

const deploy = async (
  contractName: string,
  _args: string[][] = [],
  overrides = {},
  libraries = {}
) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName, {
    libraries: libraries,
  });
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);

  let extraGasInfo = "";
  if (
    deployed &&
    deployed.deployTransaction &&
    deployed.deployTransaction.gasPrice
  ) {
    const gasUsed = deployed.deployTransaction.gasLimit.mul(
      deployed.deployTransaction.gasPrice
    );
    extraGasInfo = `${utils.formatEther(gasUsed)} ETH, tx hash ${
      deployed.deployTransaction.hash
    }`;
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(deployed.address)
  );
  console.log(" ⛽", chalk.grey(extraGasInfo));

  return deployed;
};

// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed: Contract, contractArgs: string[][]) => {
  // not writing abi encoded args if this does not pass
  if (
    !contractArgs ||
    !deployed ||
    !hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  const encoded = utils.defaultAbiCoder.encode(
    deployed.interface.deploy.inputs,
    contractArgs
  );
  return encoded;
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
