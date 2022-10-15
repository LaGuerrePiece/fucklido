import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
// import { setup1inchWidget } from '@1inch/embedded-widget';
import { darkTheme as uDarkTheme, lightTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { Button } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa';


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
          Go <a href="#">Rocket</a> Today !
        </h1>
        <h3 className={styles.title}>
          Let's make <a href="#">Ethereum</a> more <a href="#">decentralized</a> 
        </h3>

        <p className={styles.text}>
        You have: {stEthBalance?.formatted} {stEthBalance?.symbol}
        </p>
        <p className={styles.text}>
        You can help making Ethereum more decentralized by switching from Lido's centralized stETH to Rocket Pool's rETH. 
        </p>
        <p className={styles.text}>
        What are you waiting for ? 
        </p>
        <p className={styles.text}>
        <a href="https://twitter.com/search?q=%23GoRocket">#GoRocket</a>
        </p>

        <div className="Uniswap pb-4">
          <SwapWidget theme={uDarkTheme}
              tokenList={MY_TOKEN_LIST}
              defaultInputTokenAddress={stETH} 
              defaultInputAmount={stEthBalance?.formatted}
              defaultOutputTokenAddress={rETH}
            />
        </div>
        <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20sold%20my%20stETH%20for%20rETH%20on%20%3A%20gorocket.today%20%21%0ALet%27s%20help%20%20decentralize%20Ethereum%2C%20%23GoRocket">
          <Button colorScheme='twitter' leftIcon={<FaTwitter />} >
            Share the word
          </Button>
        </a>

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
