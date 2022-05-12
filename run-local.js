require('dotenv').config()
const hardhat = require('hardhat')
const {
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  STORE_OWNER,
  MAINNET_PROXY_REGISTRY,
  RINKEBY_PROXY_REGISTRY,
  PAYOUT_ADDRESS,
  URI,
} = process.env

const proxyRegistryAddress = hardhat.network.name == 'mainnet' ? MAINNET_PROXY_REGISTRY : RINKEBY_PROXY_REGISTRY

async function main() {
  const ContractFactory = await hardhat.ethers.getContractFactory(CONTRACT_NAME)
  const contract = await ContractFactory.deploy(
    CONTRACT_NAME,
    CONTRACT_SYMBOL,
    URI,
    proxyRegistryAddress,
    '0x3CCF5C26230EA705d14BCe355Aa08F7A3E499A1f',
    1000,
    '0x3CCF5C26230EA705d14BCe355Aa08F7A3E499A1f'
  )

  await contract.deployed()

  console.log('contract deployed to:', contract.address)
  // await setMintList(contract)
  await enablePresale(contract)
  // await enablePublicSale(contract)
}

async function setMintList(contract) {
  console.log(`setting the mintlist merkle root`)
  await contract.setMintlistMerkleRoot('0xc3c6c13e64c8102ab3f750e394e27339730042f024ba37510ad01c4d7532e378')
}

async function enablePresale(contract) {
  console.log(`enabling pre sale`)
  await contract.togglePresaleActive()
  await setMintList(contract)
}

async function enablePublicSale(contract) {
  console.log(`enabling public sale`)
  await contract.togglePublicSaleActive()
}

const runMain = async () => {
  try {
    await main()
    //process.exit(0);
    setInterval(() => {}, 1 << 30)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
