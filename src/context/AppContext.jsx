"use client";
import React, { createContext, useState, useEffect} from "react";
import { useAccount } from "@starknet-react/core";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import Web3 from "web3";
import { testSchemaId, zkPassAppId } from "@/config/constants";
import FlightDelayInsurance from './FlightDelayInsurance.json'; 

// Define the schema and app IDs



// Create the context
export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const { address } = useAccount();
  const [contract, setContract] = useState(null);


  // States
  const [web3, setWeb3] = useState(null);
  const [zkPassRes, setzkPassRes] = useState(null);

  // Functions

  // Generate zkPass proof
  const generate = async () => {
    try {
      // The appid of the project created in dev center
      alert("Called zkPass fun");
      // Create the connector instance
      const connector = new TransgateConnect(zkPassAppId);

      // Check if the TransGate extension is installed
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        // Launch the process of verification
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

  // Verify zkPass proof
  const verifyProof = async (proof) => {
    try {
      // Create the connector instance
      const web3 = new Web3();
      // const { taskId, uHash, publicFieldsHash, recipient } = zkPassRes;
    } catch (error) {
      alert(`Error verifying proof ${error}`);
    }
  };

  // Purchase flight insurance
  const payForInsurance = async (amount) => {
    await contract.methods.payForInsurance().send({
      from: address,
      value: web3.utils.toWei(amount, 'ether')
    });
  };

  const withdrawPayout = async (amount) => {
    await contract.methods.withdrawPayout(address, web3.utils.toWei(amount, 'ether')).send({
      from: address
    });
  };

  // Init Function
  useEffect(() => {
   async function init() {
        // Initialize web3
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        setWeb3(web3);
  
        // Network ID
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FlightDelayInsurance.networks[networkId];
  
        // Create contract instance
        const instance = new web3.eth.Contract(
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
        zk: {
          generate,
          verifyProof,
          zkPassRes,
        },
        contract:{
          withdrawPayout,
          payForInsurance,
        },
        wallet: {
          web3,
          setWeb3,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
