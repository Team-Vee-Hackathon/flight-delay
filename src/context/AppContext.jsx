"use client";
import { createContext,useState,useEffect } from "react";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
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

  //Init Function
  useEffect(()=>{
	function init(){
		
	}
	init();
  },[])

  return (
    <AppContext.Provider
      value={
        {
          account,
          setAccount,
          connectWallet,
          disconnectWallet,
          web3,
          setWeb3
        }
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
