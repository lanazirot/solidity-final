const { ethers } = require("hardhat");

async function main() {
    const MainContractNFT = await ethers.ContractFactory("ArGram")
    const mainContract = await MainContractNFT.deploy()
    const txhHash = mainContract.deployTransaction.hash;
    const txReceipt = await ethers.providers.waitForTransaction(txhHash)
    console.info("Contract deployed to address:", txReceipt.contractAddress)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error)
        process.exit(1)
    })