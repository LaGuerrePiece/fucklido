import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { setup1inchWidget } from '@1inch/embedded-widget';
import { darkTheme as uDarkTheme, lightTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

import { Button } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa';

import styles from './styles.module.css';
import { useAccount, useBalance, useSigner, useProvider, useWebSocketProvider } from 'wagmi';
import { Helmet } from "react-helmet";
import {useRef, useEffect} from 'react';

const App = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const ref = useRef(null);
  const provider = useProvider({
    chainId: 1,
  })
  
  useEffect(() => {
    const el2 = ref.current;
    
    console.log(el2);

    if (!ref.current) return
    if (!window) return

    const iframeJsonRpcManager = setup1inchWidget({
      chainId: 1,
      sourceTokenSymbol: '1INCH',
      destinationTokenSymbol: 'DAI',
      hostElement: ref.current,
      provider: (window as any).ethereum,
      // provider: provider,
      theme: 'light',
      sourceTokenAmount: '15'
    });
    const iframe = document.getElementById('oneInchWidgetFrame') as HTMLIFrameElement
    // iframe.style.cssText = "width"
    iframe.setAttribute('style', "width=500px; height=500px");



  }, []);

  const { data : stEthBalance } = useBalance({
    addressOrName: address,
    token: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  })
  const { data: signer, isError: signerError, isLoading: signerLoading } = useSigner()
    // const CG_TOKEN_LIST = 'https://tokens.coingecko.com/ethereum/all.json'
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
    const stETH = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84' 
    const rETH = '0xae78736cd615f374d3085123a210448e74fc6393'

    const params = {amountToSell:stEthBalance?.value, userAddr: address}

    // const host = document.createElement('div');
    // const hostelement = document.getElementById("hostelement") as HTMLElement
    // console.log('hostelement', hostelement)
    
    // document.appendChild(host)



  return (
    <div className={styles.container}>
      <Helmet>
      I%20just%20sold%20my%20stETH%20for%20rETH%20on%20%3A%20gorocket.today%20%21%0ALet%27s%20help%20%20decentralize%20Ethereum%2C%20%23GoRocket%20%F0%9F%9A%80        <title>Go Rocket 🚀</title>
        <meta
          name="Dump stETH now for rETH !"
          content="Help decentralize the network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <main className={styles.main}>
        {/* <ConnectButton /> */}
        <h1 className={styles.title}>
          Go <a>Rocket</a> Today 🚀 
        </h1>
        <h3 className={styles.title}>
          Let's make <a>Ethereum</a> more <a>decentralized</a> 
        </h3>

        <p className={styles.text}>
        You have: {stEthBalance?.formatted} {stEthBalance?.symbol}
        </p>
        <p className={styles.text}>
        You can help making Ethereum more decentralized </p> 
        <p className={styles.text}>
        by switching from Lido's centralized stETH to Rocket Pool's rETH. 
        </p>
        <p className={styles.text}>
        What are you waiting for ? 
        </p>
        <p className={styles.text}>
        <a href="https://twitter.com/search?q=%23GoRocket">#GoRocket 🚀</a>
        </p>

        <div ref={ref} className="w-96 h-96 pb-4">

        </div>
        <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20sold%20my%20stETH%20for%20rETH%20on%20%3A%20gorocket.today%20%21%0ALet%27s%20help%20%20decentralize%20Ethereum%2C%20%23GoRocket%20%F0%9F%9A%80">
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
