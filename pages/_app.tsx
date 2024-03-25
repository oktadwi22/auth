import {
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import config from './config';
import '@rainbow-me/rainbowkit/styles.css';
import { SiweMessage } from 'siwe';
import { useAccount } from 'wagmi';
import { AuthenticationStatus } from '@rainbow-me/rainbowkit';

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch('/api/nonce');
    return await response.text();
  },

  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    });
  },

  getMessageBody: ({ message }) => {
    return message.prepareMessage();
  },

  verify: async ({ message, signature }) => {
    const verifyRes = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature }),
    });

    return Boolean(verifyRes.ok);
  },

  signOut: async () => {
    await fetch('/api/logout');
  },
});


const queryClient = new QueryClient();


export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
 
  const [Status , setStatus] = useState<AuthenticationStatus>('unauthenticated')


  return (
    <WagmiProvider config={config}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitAuthenticationProvider
            adapter={authenticationAdapter}
            status={Status}
          >
            <RainbowKitProvider>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitAuthenticationProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}