import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  mainnet,
  sepolia
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '16293a1f5007277eebc791eff80f1dd8',
  chains: [mainnet, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config