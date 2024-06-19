"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import Web3 from "web3";
import { CONTRACT_ADDRESS, testSchemaId, zkPassAppId } from "@/config/constants";
import FlightDelayInsurance from '../abi/FlightDelayInsurance.json';
const url = 'https://sepolia.infura.io/v3/23efd0b587694ca08eb300b2f1831ea6'
// Define the schema and app IDs
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [selInsurance,setInsurance] = useState(null);

  const [web3, setWeb3] = useState(null);
  const [zkPassRes, setzkPassRes] = useState(null);

  const loadContract = async () => {
   try{
      const contract = new window.web3.eth.Contract(FlightDelayInsurance.abi, CONTRACT_ADDRESS);
      setContract(contract);
      console.log(contract)
  } catch (error) {
    console.error("Error loading contract:", error);
    window.alert('An error occurred while loading the smart contract.');
  }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(new Web3.providers.HttpProvider(url));
        window.web3 = web3;
        // await window.ethereum.enable();
        setWeb3(web3);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        loadContract();
      }else {
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

  const verifyProof = async (proof) => {
    try {
      const web3Instance = new Web3();
    } catch (error) {
      alert(`Error verifying proof ${error}`);
    }
  };

  const payForInsurance = async (amount) => {
    if (!contract || !account) return;
    await contract.methods.payForInsurance().send({
      from: account,
      value: Web3.utils.toWei(amount.toString(), 'ether'),
    });
  };

  const withdrawPayout = async (amount) => {
    if (!contract || !account) return;

    await contract.methods.withdrawPayout(account, Web3.utils.toWei(amount.toString(), 'ether')).send({
      from: account,
    });
  };

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        //watch account change
        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
        });
      }
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
        selInsurance,setInsurance
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
