"use client"
import { AppContext } from "@/context/AppContext";
import { accountString } from "@/utils/functions";
import DialogTitle from '@mui/material/DialogTitle';
import toast, { Toaster } from "react-hot-toast";
import Dialog from '@mui/material/Dialog';
import React, { useContext, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { Box, Button, Stack } from "@mui/material";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Nav = () => {
  const { connectors, connect } = useConnect();
  const [openWalletOptions, setOpenWalletOptions] = useState(false);

  // const {account,fn} = useContext(AppContext);


  //move to dashboard
  const route = () => {
    toast.success('Wallet connected Successfully!')
    setTimeout(()=>{
      window.location.href="/dashboard"
    },2000)
  }
  return (
    <>
      <div className="flex items-center justify-center m-[2rem] gap-[30rem]">
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
              onClick={() => {
                setOpenWalletOptions(!openWalletOptions)
              }}
              className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]">
              Connect Wallet
            </button>

            // )
          }
        </div>
        <Toaster />
      </div>

      <Dialog
        TransitionComponent={Transition}
        keepMounted
        sx={{
          padding: "40px"
        }}
        onClose={() => setOpenWalletOptions(!openWalletOptions)} open={openWalletOptions}>
        <Box sx={{
          padding: "40px"
        }}>
          <DialogTitle className="text-center font-bold text-2xl mb-4">Choose a Wallet</DialogTitle>
          <Stack flexDirection="row" >
            {connectors.map((connector) => {
              return (
                <Button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 mx-2 rounded-[30px]"
                >
                  {connector.id}
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Dialog>
      
    </>
  );
};

export default Nav;