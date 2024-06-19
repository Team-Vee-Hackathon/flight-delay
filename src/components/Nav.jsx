"usse client"
import { accountString } from "@/utils/functions";
import DialogTitle from '@mui/material/DialogTitle';
import TransgateConnect from "@zkpass/transgate-js-sdk";
// import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "@/context/AppContext";
import Dialog from '@mui/material/Dialog';
import React, { useContext, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import Slide from '@mui/material/Slide';
import LogoutIcon from '@mui/icons-material/Logout';
import { testSchemaId, zkPassAppId } from "@/config/constants";
import Link from "next/link";

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Nav =() => {
  const [openWalletOptions, setOpenWalletOptions] = useState(false);
  const { account, connectWallet,generate } = useContext(AppContext);

  //move to dashboard
  const route = () => {
    // toast.success('Wallet connected Successfully!')
    // setTimeout(()=>{
    window.location.href = "/dashboard"
    // },2000)
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
          account ? (
              <Stack flexDirection="row" sx={{
                gap: "10px"

              }}>
                <Link
                  href="/dashboard"
                  className="bg-[#229104] hover:bg-[#22b012] text-[#fff] px-4 py-2 rounded-[30px]"
                >My Dashboard</Link>
                {/* <button
                  onClick={() => {
                    confirm("Are you sure you want to disconnect your wallet?") && disconnect()
                  }}
                  className="bg-[#ff0000] hover:bg-[#eb4545] text-[#ffffff] px-4 py-2 rounded-full">
                  <LogoutIcon className="text-white" />
                </button> */}
              </Stack>
            ) : (
              <button
                onClick={() => {
                  // setOpenWalletOptions(!openWalletOptions)
                  connectWallet();
                }}
                className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]">
                Connect Wallet
              </button>

            )

          }
          <button
            onClick={async () => {
              await generate();
            }}
            className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]">
            Test ZK
          </button> 
           <button
            onClick={() => {
              fetch("/api/hello").then((res) => res.json()).then(console.log)
            }}
          >
            Data click
          </button>
        </div>
        {/* <Toaster /> */}
      </div>

      {/* <Dialog
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
                  onClick={() => {
                    connect({ connector })
                    setOpenWalletOptions(!openWalletOptions)
                  }}
                  className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 mx-2 rounded-[30px]"
                >
                  {connector.id}
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Dialog> */}

    </>
  );
};

export default Nav;