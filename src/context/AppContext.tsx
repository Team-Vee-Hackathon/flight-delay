"use client";
import { createContext, useState, useEffect, Dispatch } from "react";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import TransgateConnect from "@zkpass/transgate-js-sdk"
import Web3 from "web3"
export const AppContext = createContext<AppContextType|null>(null);

const testSchemaId = "d78e13727abb4359a254c7d729f0845e";
const zkPassAppId = "e35d4b59-adc1-4f9d-bf69-d1502346018b";

interface AppContextType {
  zk: {
    generate: ()=>Promise<void>,
    verifyProof: (proof: any)=>Promise<void>,
    zkPassRes: any
  },
  wallet: {
    web3: any,
    setWeb3: Dispatch<any>
  }
}

const AppContextProvider = ({ children }:{
  children: React.ReactNode
}) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  //States
  const [web3, setWeb3] = useState<any>(null)
  const [zkPassRes, setzkPassRes] = useState<any>(null)

  ///Functions ///////////////////
  //Generate zkPass proof
  const generate = async () => {
    try {
      // The appid of the project created in dev center

      // Create the connector instance
      const connector = new TransgateConnect(zkPassAppId)

      // Check if the TransGate extension is installed
      // If it returns false, please prompt to install it from chrome web store
      const isAvailable = await connector.isTransgateAvailable()

      if (isAvailable) {
        // The schema id of the project

        // Launch the process of verification
        // This method can be invoked in a loop when dealing with multiple schemas
        const res = await connector.launch(testSchemaId)
        console.log(res)
        setzkPassRes(res)

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

  //verify zkPass proof
  const verifyProof = async (proof:any ) => {
    try {
      // Create the connector instance
      const web3 = new Web3()
      // const { taskId, uHash, publicFieldsHash, recipient } = zkPassRes

    } catch (error: any) {
      alert(`Error verifying proof ${error}`)
    }
  }

  //Purchase flight insurance
  const purchaseInsurance = async (insuranceData:any) => {
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
    //error here
      value={
        {
          zk: {
            generate,
            verifyProof,
            zkPassRes
          },
          wallet: {
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
