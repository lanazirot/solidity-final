const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/NFTContract.sol/ArGram.json");
const { API_URL, PRIVATE_KEY, PUBLIC_KEY, CONTRACT_ADDRESS } = process.env;


/**
 * Transfer a NFT to an owner
 * @param {String} address Account address (owner)
 * @param {String} tokenId NFT token ID
 */
async function transferNFT(address, tokenId) {
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const gasPrice = await provider.getGasPrice();
  const nftContract = new ethers.Contract(
    CONTRACT_ADDRESS, 
    contract.abi,
    wallet
  );
  const gasLimit = await nftContract.estimateGas["safeTransferFrom(address,address,uint256)"](PUBLIC_KEY, address, tokenId, { gasPrice });
  const transaction = await nftContract["safeTransferFrom(address,address,uint256)"](PUBLIC_KEY, address, tokenId, { gasLimit });
  await transaction.wait();
  return Promise.resolve(transaction.hash)
}

module.exports = { transferNFT }
