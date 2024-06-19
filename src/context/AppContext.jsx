"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import Web3 from "web3";
import { CONTRACT_ADDRESS, DEMO_PRIVATE_KEY, testSchemaId, zkPassAppId } from "@/config/constants";
import FlightDelayInsurance from '../abi/FlightDelayInsurance.json';
import axios from "axios";
const url = 'https://sepolia.infura.io/v3/23efd0b587694ca08eb300b2f1831ea6'
// Define the schema and app IDs
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [selInsurance, setInsurance] = useState(null);

  const [web3, setWeb3] = useState(null);
  const [zkPassRes, setzkPassRes] = useState(null);

  const loadContract = async () => {
    try {
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

  const verifyProof = async (proof) => {
    try {
      const web3Instance = new Web3();
    } catch (error) {
      alert(`Error verifying proof ${error}`);
    }
  };

  const payForInsurance = async (amount = 0.0002) => {
    if (!account) throw Error("Connect your wallet");
    const web3 = new Web3(new Web3.providers.HttpProvider(url));
    const contract = new web3.eth.Contract(FlightDelayInsurance.abi, CONTRACT_ADDRESS);
    const txData = contract.methods.payForInsurance().encodeABI();
    const accountFromPrivateKey = web3.eth.accounts.privateKeyToAccount(`0x${DEMO_PRIVATE_KEY}`);
    web3.eth.accounts.wallet.add(accountFromPrivateKey);
    web3.eth.defaultAccount = accountFromPrivateKey.address;

    // Estimate gas limit
    const gas = await web3.eth.estimateGas({
      from: accountFromPrivateKey.address,
      to: contract.options.address,
      data: txData,
      value: Web3.utils.toWei(amount, 'ether'),
    });

    // Get gas price
    const gasPrice = await web3.eth.getGasPrice();
    const tx = {
      from: accountFromPrivateKey.address,
      to: contract.options.address,
      value: Web3.utils.toWei(amount, 'ether'),
      data: txData,
      gas,
      gasPrice

    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, accountFromPrivateKey.privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    //add to db
   await axios.post("/api/insurance", {
      account,
      fromEntityId: selInsurance.fromEntityId,
      insurancePrice: selInsurance.insurancePrice,
      flightPrice: selInsurance.flightPrice.raw,
      toEntityId: selInsurance.toEntityId,
      departDate: selInsurance.departDate,
      cabinClass: selInsurance.cabinClass,
      adults: selInsurance.adults,
    })
    return receipt
  };


  const withdrawPayout = async (amount) => {
    if (!contract || !account) return alert("Connect your wallet");
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
        selInsurance, setInsurance
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
