const ethers = require("ethers");
const fs = require("fs-extra");
const { provider } = require("ganache");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
  console.log(encryptedJsonKey);
}

main()
  .then(() => process.exit())
  .catch((error) => console.error(error));
