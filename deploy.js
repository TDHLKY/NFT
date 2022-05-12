require('dotenv').config()

const hardhat = require('hardhat')
const {
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  URI,
  MAINNET_PROXY_REGISTRY,
  RINKEBY_PROXY_REGISTRY,
  ROYALTY_ADDRESS,
  ROYALTY_BASIS_POINTS,
  INCUBATOR,
} = process.env

const network = hardhat.network.name
const proxyRegistryAddress = network == 'mainnet' ? MAINNET_PROXY_REGISTRY : RINKEBY_PROXY_REGISTRY

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  const ContractFactory = await ethers.getContractFactory(CONTRACT_NAME)
  const contract = await ContractFactory.deploy(
    CONTRACT_NAME,
    CONTRACT_SYMBOL,
    URI,
    proxyRegistryAddress,
    ROYALTY_ADDRESS,
    ROYALTY_BASIS_POINTS,
    INCUBATOR
  )
  await contract.deployed()
  console.log('Contract deployed to address:', contract.address)
  if (network !== 'mainnet') {
    // await setMintList(contract)
    // await enablePresale(contract)
    await enablePublicSale(contract)
  }
  console.log(`open contract on etherscan: https://rinkeby.etherscan.io/address/${contract.address}#code`)
  console.log(
    `verify contract on etherscan:\n\n npm run etherscan-verify --address=${contract.address} --proxy_registry=0xf57b2c51ded3a29e6891aba85459d600256cf317 -- --network ${network}`
  )
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
