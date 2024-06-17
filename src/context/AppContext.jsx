"use client";
import { createContext,useState,useEffect } from "react";
import Web3 from "web3";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  //States
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null)

  ///Functions ///////////////////
  //Connect Wallet
  const connectWallet = async () => {
	if(window.ethereum){
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		const web3 = new Web3(window.ethereum);
		setWeb3(web3);
		// Get the user's accounts
		const accounts = await web3.eth.getAccounts();
		console.log('Connected account:', accounts[0]);
		setAccount(accounts[0]);
	}else{
		alert("MetaMask is not installed. Please install it to use this app.")
	}
  }

  //Disconnect Wallet
  const disconnectWallet = () => {
	setAccount(null);
	// window.ethereum = null;
  }

  //Init Function
  useEffect(()=>{
	function init(){
		if(window.ethereum){
			//stream account changes
			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0]);
			});
			const web3 = new Web3(window.ethereum);
			setWeb3(web3);
			web3.eth.getAccounts().then(accounts => {
				if(accounts.length > 0){
					setAccount(accounts[0]);
				}
			})
		}
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
