import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { setup1inchWidget } from '@1inch/embedded-widget';
import '@uniswap/widgets/fonts.css'

import { Button } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa';

import styles from './styles.module.css';
import { useAccount, useBalance, useSigner, useProvider } from 'wagmi';
import { Helmet } from "react-helmet";
import {useRef, useEffect} from 'react';

const App = () => {
  const { address } = useAccount()
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
      sourceTokenSymbol: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
      destinationTokenSymbol: '0xae78736cd615f374d3085123a210448e74fc6393',
      hostElement: ref.current,
      provider: (window as any).ethereum,
      theme: 'dark',
      sourceTokenAmount: '15',
      oneInchOrigin: "https://bafybeif2ygf6can5g343kfsey7uf6m7ea4pjnfcdomijuqsqvj5oslmwgq.ipfs.dweb.link/"

    });
    const iframe = document.getElementById('oneInchWidgetFrame') as HTMLIFrameElement
    iframe.src = `https://bafybeif2ygf6can5g343kfsey7uf6m7ea4pjnfcdomijuqsqvj5oslmwgq.ipfs.dweb.link/#/1/unified/swap/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84/0xae78736cd615f374d3085123a210448e74fc6393`;
    iframe.width = "430";
    iframe.height = "590";
    iframe.frameBorder = "0"
    iframe.scrolling = 'no'


  }, []);

  return (
    <div className={styles.container}>
      <Helmet>
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
        {/* You have: {stEthBalance?.formatted} {stEthBalance?.symbol} */}
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

        {/* <Iframe url="https://bafybeif2ygf6can5g343kfsey7uf6m7ea4pjnfcdomijuqsqvj5oslmwgq.ipfs.dweb.link/#/1/unified/swap/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84/0xae78736cd615f374d3085123a210448e74fc6393"
          width="400px"
          height="520px"
          id=""
          className=""
          display="block"
          position="relative"
          scrolling='no'
        /> */}

        <div ref={ref} className="w-460 h-300 pb-4">
        </div>

        <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20sold%20my%20stETH%20for%20rETH%20on%20%3A%20gorocket.today%20%21%0ALet%27s%20help%20%20decentralize%20Ethereum%2C%20%23GoRocketToday%20%F0%9F%9A%80">
          <Button colorScheme='blue' size="lg" leftIcon={<FaTwitter />} >
            Spread the word
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
