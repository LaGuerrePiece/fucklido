import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
// import { setup1inchWidget } from '@1inch/embedded-widget';
import { darkTheme as uDarkTheme, lightTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

import styles from './styles.module.css';
import { useAccount, useBalance, useSigner, useContract, useDisconnect } from 'wagmi';
import { Helmet } from "react-helmet";

const App = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data : stEthBalance } = useBalance({
    addressOrName: address,
    token: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  })
  const { data: signer, isError: signerError, isLoading: signerLoading } = useSigner()
    // Default token list from Uniswap
    const MY_TOKEN_LIST = [
      {
      "name": "Rocket Pool's decentralized staked ETH",
      "address": "0xae78736cd615f374d3085123a210448e74fc6393",
      "symbol": "rETH",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/15060.png"
    },
      {
      "name": "Lido's centralized stETH",
      "address": "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
      "symbol": "stETH",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/8085.png"
    },
  ]
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
        You have: {stEthBalance?.formatted} {stEthBalance?.symbol}
        </p>
          {/* <iframe className="w-1/2 h-72" src="https://app.1inch.io/#/1/embedded-swap/STETH/RPL?theme=dark">

          </iframe> */}
          {/* <iframe src="https://brucecrypto.vercel.app/widget" width="340" height="470"></iframe> */}

            <div className="Uniswap">
            <SwapWidget theme={uDarkTheme}
                  tokenList={MY_TOKEN_LIST}
                  defaultInputTokenAddress={stETH} 
                  defaultInputAmount={stEthBalance?.formatted}
                  defaultOutputTokenAddress={rETH}/>
            </div>
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
