import Link from "next/link";
import { useDashboardContext } from "./Provider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  getAssociatedTokenAddress,
  getAccount,
  createAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  PublicKey,
  clusterApiUrl,
  Connection,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
export function TopBar() {
  const { toggleSidebar } = useDashboardContext();
  const [bonkBalance, setBonkBalance] = useState(0);

  const { publicKey } = useWallet();
  const [parseHistoryUrl, setParseHistoryUrl] = useState("");

  // Helius RPC URL and API key
  const HELIUS_RPC_URL =
    "https://rpc.helius.xyz?api-key=4facc46f-a686-4906-8283-45f08abb210f";
  const connection = new Connection(HELIUS_RPC_URL);
  const BONK_MINT_ADDRESS = new PublicKey(
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
  );

  useEffect(() => {
    if (!connection || !publicKey) {
      console.log("No connection or publicKey found.");
      return;
    }
    setParseHistoryUrl(
      `https://api.helius.xyz/v0/addresses/${publicKey}/transactions?api-key=4facc46f-a686-4906-8283-45f08abb210f`
    );
  }, [connection, publicKey]);

  useEffect(() => {
    const fetchBalances = async () => {
      console.log("Fetching balances...");
      console.log("PublicKey:", publicKey?.toBase58());
      console.log("Connection:", connection.rpcEndpoint);

      try {
        // Get associated token account for BONK
        const bonkTokenAccount = await getAssociatedTokenAddress(
          BONK_MINT_ADDRESS,
          publicKey
        );
        console.log("BONK Token Account:", bonkTokenAccount.toBase58());

        // Fetch BONK token balance
        const bonkAccountInfo = await connection.getTokenAccountBalance(
          bonkTokenAccount
        );
        console.log("BONK Account Info:", bonkAccountInfo);

        const bonkBalance = bonkAccountInfo.value.amount; // Amount is in the smallest unit
        setBonkBalance(bonkBalance);
      } catch (error) {
        console.error("Failed to fetch BONK balance:", error);

        // Attempt to create the associated token account if it doesn't exist
        try {
          const bonkTokenAccount = await createAssociatedTokenAccount(
            connection,
            publicKey,
            BONK_MINT_ADDRESS,
            publicKey
          );

          console.log(
            "Created BONK Token Account:",
            bonkTokenAccount.toBase58()
          );

          // Fetch BONK token balance again
          const bonkAccountInfo = await connection.getTokenAccountBalance(
            bonkTokenAccount
          );
          console.log("BONK Account Info:", bonkAccountInfo);

          const bonkBalance = bonkAccountInfo.value.amount; // Amount is in the smallest unit
          setBonkBalance(bonkBalance);
        } catch (creationError) {
          console.error("Failed to create BONK token account:", creationError);
          setBonkBalance(0);
        }
      }
    };

    fetchBalances();
  }, [connection, publicKey]);

  return (
    <header className="relative z-10 h-16 w-full items-center  md:h-20 border-b-2 border-[#212121] ">
      <div className="relative mx-auto flex h-full flex-col justify-center px-3">
        <div className="relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
          <div className="relative left-0 flex w-3/4">
            <div className="flex  gap-[40px]">
              <Link href="/">
            
                <div className="w-[110px] bg-[#6e6b6b11] h-[80px] items-center justify-center flex cursor-pointer hover:opacity-[0.7] text-[16px] item-center flex-col">
                <Image
                                            src="/bat.png"
                                            width={25}
                                            height={25}
                                            alt=""
                                            priority
                                            // className=" fill-[#ffd700] "
                                            

                                        />
              

                  Raffle
                </div>
              </Link>
              <Link href="/game2">
                <div className="w-[110px] bg-[#6e6b6b11] h-[80px] items-center justify-center flex cursor-pointer hover:opacity-[0.7] text-[16px] item-center flex-col">
                <Image
                                            src="/classic.png"
                                            width={25}
                                            height={25}
                                            alt=""
                                            priority
                                            // className=" fill-[#ffd700] "
                                            

                                        />
                 Battle
                </div>
              </Link>
              <Link href="/game3">
                {" "}
                <div className="w-[110px] bg-[#6e6b6b11] h-[80px] items-center justify-center flex cursor-pointer hover:opacity-[0.7] text-[16px] item-center flex-col">
                <Image
                                            src="/battle.svg"
                                            width={24}
                                            height={24}
                                            alt=""
                                            priority
                                            // className=" fill-[#ffd700] "
                                            

                                        />
                Spin
                  
                </div>
              </Link>
            </div>
          </div>
          <div className="relative mr-2 flex w-full items-center justify-end p-1 sm:right-auto sm:mr-0 gap-[25px]">
            <div className="mr-2 px-2">
              {publicKey ? (
                <div className="flex items-center gap-[10px]">
                   <Image
                                            src="/bonk.png"
                                            width={24}
                                            height={24}
                                            alt=""
                                            priority
                                            // className=" fill-[#ffd700] "
                                            

                                        />
                  <h1 className="flex items-center flex-col text-[12px]">
                    <span className="text-primary text-[14px]">BONK BALANCE</span> {" "}
                    {bonkBalance}  
                  </h1>
                </div>
              ) : (
                <h1 className="flex items-center gap-[10px]">
                    <Image
                                            src="/bonk.png"
                                            width={24}
                                            height={24}
                                            alt=""
                                            priority
                                            // className=" fill-[#ffd700] "
                                            

                                        />
                                        <h1 className="flex flex-col ">
                  <span className="text-primary">BONK</span> Balance 🐕{" "}
                  </h1>
                </h1>
              )}
            </div>
            <section className="relative block">
              <WalletMultiButton />
            </section>
          </div>
        </div>
      </div>
    </header>
  );
}
