import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
// import { setup1inchWidget } from '@1inch/embedded-widget';
import { darkTheme as uDarkTheme, lightTheme, Theme, SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { Button } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa';

import styles from './styles.module.css';
import { useAccount, useBalance, useSigner, useContract, useDisconnect } from 'wagmi';
import { Helmet } from "react-helmet";
import { constructSimpleSDK, SwapSide } from '@paraswap/sdk';
import axios from 'axios';
import {useEffect} from 'react';


const paraSwapMin = constructSimpleSDK({chainId: 1, axios});

const App = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data : stEthBalance } = useBalance({
    addressOrName: address,
    token: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  })
  const { data: signer, isError: signerError, isLoading: signerLoading } = useSigner()
    // Default token list from Uniswap
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
      "name": "Wrapped Ether",
      "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "symbol": "wETH",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://etherscan.io/token/images/weth_28.png"
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
    // useEffect(() => {
    //   // declare the data fetching function
    //   const fetchPrice = async () => {
    //     const stETH = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84' 
    //     const rETH = '0xae78736cd615f374d3085123a210448e74fc6393'
    //     const priceRoute = await paraSwapMin.swap.getRate({
    //       srcToken: stETH,
    //       destToken: rETH,
    //       amount: stEthBalance?.value.toString()!,
    //       userAddress: address,
    //       side: SwapSide.SELL,
    //     });
    //     console.log("!!!!!!!!!!!!!!!!!!!", priceRoute)
    //     return priceRoute;
    // }
    // const price = fetchPrice()
    // // make sure to catch any error
    // .catch(console.error);
    // // console.log("asdasd", price)
    // }, [])
  

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
        <ConnectButton />
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

        <div className="Uniswap pb-4">
          <SwapWidget theme={uDarkTheme}
              tokenList={MY_TOKEN_LIST}
              defaultInputTokenAddress={stETH} 
              defaultInputAmount={0.1}
              defaultOutputTokenAddress={rETH}
            />
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
