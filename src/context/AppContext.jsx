"use client";
import { createContext,useState,useEffect } from "react";

export const AppContext = createContext();

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
      value={{
        account,
		web3,
		fn:{
			connectWallet,
			disconnectWallet
		},
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
