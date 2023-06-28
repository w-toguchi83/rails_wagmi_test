import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = '2d8c8b00a701c4b9f8b993d49707c8ef'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)
const web3modal = new Web3Modal({ projectId }, ethereumClient)

document.addEventListener('DOMContentLoaded', () => {
  const walletConnectButton = document.querySelector('.js-wallet-connect-btn')
  walletConnectButton.addEventListener('click', async () => {
    await web3modal.openModal()
  })
})

