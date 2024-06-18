"use client";
import { createContext, useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";

export const AppContext = createContext(null);

const testSchemaId = "d78e13727abb4359a254c7d729f0845e";
const zkPassAppId = "e35d4b59-adc1-4f9d-bf69-d1502346018b";

const AppContextProvider = ({ children }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  //States
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null)

  ///Functions ///////////////////
  //Connect Wallet
  const connectWallet = async () => {

  }

  //Disconnect Wallet
  const disconnectWallet = () => {
    setAccount(null);
    // window.ethereum = null;
  }

  //Generate zkPass proof
  const generate = async (schemaId, appid) => {
    try {
      // The appid of the project created in dev center
      const appid = "8fb9d43c-2f24-424e-a98d-7ba34a5532f5"

      // Create the connector instance
      const connector = new TransgateConnect(appid)

      // Check if the TransGate extension is installed
      // If it returns false, please prompt to install it from chrome web store
      const isAvailable = await connector.isTransgateAvailable()

      if (isAvailable) {
        // The schema id of the project
        const schemaId = "516a720e-29a4-4307-ae7b-5aec286e446e"

        // Launch the process of verification
        // This method can be invoked in a loop when dealing with multiple schemas
        const res = await connector.launch(schemaId)

        //If you want to send the result to the blockchain, please add the wallet address as the second parameter.
        //const res = await connector.launch(schemaId, address)

        // verifiy the res onchain/offchain based on the requirement     

      } else {
        console.log('Please install TransGate')
      }
    } catch (error) {
      console.log('transgate error', error)
    }
  }

  //Purchase flight insurance
  const purchaseInsurance = async (insuranceData) => {
    //Transfer money using smart contract

    //Save data into data using api

    //validate and mint insurance data using zkPass
  }

  //Init Function
  useEffect(() => {
    function init() {

    }
    init();
  }, [])

  return (
    <AppContext.Provider
      value={
        {
          wallet: {
            account,
            setAccount,
            connectWallet,
            disconnectWallet,
            web3,
            setWeb3,

          }
        }
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
