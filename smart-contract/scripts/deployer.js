const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

//   const balance = await deployer.getBalance();
//   console.log("Account balance:", balance.toString());

  const FlightDelayInsurance = await hre.ethers.getContractFactory("FlightDelayInsurance");
  const insurance = await FlightDelayInsurance.deploy();

  await insurance.deployed();

  console.log("FlightDelayInsurance deployed to:", insurance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });