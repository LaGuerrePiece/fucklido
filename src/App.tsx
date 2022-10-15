import { ConnectButton } from '@rainbow-me/rainbowkit';
// import {EthereumIframeJsonRpcManager, EthereumProvider} from './ethereum-iframe-json-prc-manager';

import styles from './styles.module.css';
import { useAccount, useBalance, useSigner, useContract, useDisconnect } from 'wagmi';
import { Helmet } from "react-helmet";

const App = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data } = useBalance({
    addressOrName: address,
    token: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  })
  const { data: signer, isError: signerError, isLoading: signerLoading } = useSigner()
    // Default token list from Uniswap
    const UNISWAP_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

    // Use the native token of the connected chain as the default input token
    const stETH = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84' // Special address for native token

    // WBTC as the default output token
    const rETH = '0xae78736cd615f374d3085123a210448e74fc6393'
 
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Dump stETH</title>
        <meta
          name="Dump stETH now for rETH !"
          content="Help decentralize the network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Let's make <a href="#">Ethereum</a> more <a href="#">decentralized</a> !
        </h1>

        <p className={styles.description}>
        You have: {data?.formatted} {data?.symbol}
        </p>
          {/* <SwapWidget /> */}
          <iframe className="w-1/2 h-72" src="https://app.1inch.io/#/1/embedded-swap/STETH/RPL?theme=dark">

          </iframe>
      </main>

      <footer className={styles.footer}>
        <a href="https://twitter.com/nicolasdeluz" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by ndlz.eth
        </a>
      </footer>
    </div>
  );
};

export default App;
