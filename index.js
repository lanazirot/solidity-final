const { createImgInfo, createJsonInfo, mintNFT } = require("./scripts/nfts.js");
const { transferNFT } = require("./scripts/transfer.js");
const data = require("./accounts.json");

console.info("Starting script...");
console.debug("Current data to send NFTS...");
console.table(data);

/**
 * Process individual item to send NFT
 * @param {Array} item Item account
 */
const processItem = async (item) => {
  try {
    console.info(`Now interacting with account ${item['address']}`)
    const fileIPFS = await createImgInfo(item["image"]);
    console.log(`FileIPFS: ${fileIPFS}`);
    const metadata = {
      image: fileIPFS,
      name: item["name"],
      description: item["description"],
      attributes: [
        { trait_type: "color", value: "brown" },
        { trait_type: "background", value: "white" },
      ],
    };
    const tokenURI = await createJsonInfo(metadata);
    console.debug("Token URI:", tokenURI);
    const { tokenId, hash } = await mintNFT(tokenURI);
    console.debug(`NFT Token ID ${tokenId} with hash ${hash}`)
    const txHash = await transferNFT(item["address"], tokenId);
    console.debug(`Transaction Hash ${txHash}`);
    console.log("\n")
  } catch (error) {
    console.error(error);
  }
};

/**
 * Main function handler
 */
const main = async () => {
    for(item of data){
        await processItem(item)
    }
};

/**
 * Main function call
 */
main();

