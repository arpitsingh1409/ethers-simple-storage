const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
//http://127.0.0.1:7545

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");

  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );

  // wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  //   const transactionReceipt = await contract.deployTransaction.wait(1);
  //   console.log(transactionReceipt);
  await contract.deployTransaction.wait(1);
  console.log(`Deployed Successfully at ${contract.address}`);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite Number: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error));
