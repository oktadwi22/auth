
import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/Home.module.css';
import { useAccount } from 'wagmi'
import config from './config'
import { useState } from 'react';


const Stake: NextPage = () => {

  const [disableWallet, setDisableWallet] = useState(false)
  const account = useAccount()


  return (
    <>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className={styles.topnav}>
        <div className=''> logo</div>
        {!disableWallet && (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks

              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button className="flex w-36 h-10 px-2 py-2  items-center hover:transition duration-[0.8s] hover:duration-[0.3s] ring-white ring-1 hover:ring-blue-400 hover:shadow-md hover:shadow-blue-400"

                          onClick={openConnectModal}
                          type="button"
                          style={{
                            alignItems: "center",
                            fontWeight: "600",
                            borderRadius: "13px",
                            marginLeft: "13px",

                          }}
                        >
                          <span className="">CONNECT WALLET</span>
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          {" "}
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 12,

                        }}
                      >

                        <button className="px-2 py-2 flex w-full justify-center items-center hover:transition duration-[0.8s] hover:duration-[0.3s] ring-white ring-1 hover:ring-blue-400 hover:shadow-md hover:shadow-blue-400"

                          onClick={openChainModal}
                          style={{

                            alignItems: "center",
                            borderRadius: "13px",
                            color: "#ffff",

                          }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div className='flex'
                              style={{
                                background: chain.iconBackground,
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                overflow: "hidden",
                              }}
                            >
                              {chain.iconUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 20, height: 20 }}
                                />
                              )}
                            </div>
                          )} <span className="text-sm">
                            {chain.name}</span>

                        </button>

                        <button className="flex mr-2 px-2 py-2  items-center hover:transition duration-[0.8s] hover:duration-[0.3s] ring-white ring-1 hover:ring-blue-400 hover:shadow-md hover:shadow-blue-400"

                          onClick={openAccountModal}
                          type="button"
                          style={{
                            alignItems: "center",
                            fontWeight: "600",
                            borderRadius: "13px",
                            marginLeft: "13px",
                          }}
                        >
                          <div className="hidden sm:block">
                            {account.displayName}
                          </div>

                        </button>

                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        )}
      </div>
      <main className={styles.main}>

      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </>
  );
};

export default Stake;
