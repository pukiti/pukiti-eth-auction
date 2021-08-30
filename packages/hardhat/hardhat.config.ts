import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ganache";

import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/types";

task("accounts", "Prints the list of accounts", async (_args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.0",
  typechain: {
    outDir: "../frontend/@types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },
  paths: {
    artifacts: "../frontend/artifacts", // We output artifacts to the frontend so we can use the ABI and it's address locally.
  },
} as HardhatUserConfig;
