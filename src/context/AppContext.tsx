"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useAccount } from "@starknet-react/core";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import Web3 from "web3";
import { testSchemaId, zkPassAppId } from "@/config/constants";
import FlightDelayInsurance from '../abi/FlightDelayInsurance.json';

// Define the schema and app IDs
interface AppContextType {
  account: string | null;
  connectWallet: () => void;
  generate: () => void;
  verifyProof: (proof: any) => void;
  zkPassRes: any;
  withdrawPayout: (amount: number) => void;
  payForInsurance: (amount: number) => void;
  web3: Web3 | null;
  setWeb3: React.Dispatch<React.SetStateAction<Web3 | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [zkPassRes, setzkPassRes] = useState<any>(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        setWeb3(web3);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0]);
      } else {
        alert("Please install Metamask Wallet");
      }
    } catch (error) {
      console.log("Error connecting wallet", error);
    }
  };

  const generate = async () => {
    try {
      alert("Called zkPass fun");
      const connector = new TransgateConnect(zkPassAppId);
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const res = await connector.launch(testSchemaId);
        console.log(res);
        setzkPassRes(res);
      } else {
        console.log("Please install TransGate");
      }
    } catch (error) {
      console.log("transgate error", error);
    }
  };

  const verifyProof = async (proof: any) => {
    try {
      const web3Instance = new Web3();
    } catch (error) {
      alert(`Error verifying proof ${error}`);
    }
  };

  const payForInsurance = async (amount: number) => {
    if (!contract || !address) return;

    await contract.methods.payForInsurance().send({
      from: address,
      value: Web3.utils.toWei(amount.toString(), 'ether'),
    });
  };

  const withdrawPayout = async (amount: number) => {
    if (!contract || !address) return;

    await contract.methods.withdrawPayout(address, Web3.utils.toWei(amount.toString(), 'ether')).send({
      from: address,
    });
  };

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        //watch account change
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          setAccount(accounts[0]);
        });
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0]);
      }
      const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");
      setWeb3(web3Instance);

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = (FlightDelayInsurance as any).networks[networkId.toString()];

      const instance = new web3Instance.eth.Contract(
        FlightDelayInsurance.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setContract(instance);
    }

    init();
  }, []);

  return (
    <AppContext.Provider
      value={{
        account,
        connectWallet,
        generate,
        verifyProof,
        zkPassRes,
        withdrawPayout,
        payForInsurance,
        web3,
        setWeb3,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
