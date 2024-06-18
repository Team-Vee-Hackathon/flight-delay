"use client"
import { AppContext } from "@/context/AppContext";
import { accountString } from "@/utils/functions";
import React, { useContext } from "react";


const Nav = () => {
  // const {account,fn} = useContext(AppContext);
  return (
    <div className="flex items-center justify-center m-[3rem] gap-[30rem]">
      <div>
        <img src="/aya.png" alt="aya logo" />
      </div>
      <div className="text-[#FFFFFF] text-[15px] items-center flex gap-[50px] cursor-pointer ">
       <p>Services</p>
        <p>Policies</p>
        <p>Contacts</p>
        {/* align this button vertically equal with others */}
        {
          // account ? (
          //   <p
          //   // onClick={()=>{
          //   //   confirm("Are you sure you want to disconnect your wallet?") && fn.disconnectWallet()
          //   // }}
          //   className="bg-[#229104] hover:bg-[#22b012] text-[#fff] px-4 py-2 rounded-[30px]"
          //   >{accountString(account)}</p>
          // ):(
            <button 
            onClick={()=>{}}
            className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]">
              Connect Wallet
            </button> 

          // )
        }
      </div>
    </div>
  );
};

export default Nav;