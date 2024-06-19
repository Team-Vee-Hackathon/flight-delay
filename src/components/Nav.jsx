"usse client"
import { accountString, convertGhsToEth } from "@/utils/functions";
import DialogTitle from '@mui/material/DialogTitle';
// import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "@/context/AppContext";
import Dialog from '@mui/material/Dialog';
import React, { useContext, useState } from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import Slide from '@mui/material/Slide';
import Link from "next/link";

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Nav = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const [txHash, setTxHash] = useState(null)
  const { account, connectWallet, generate, payForInsurance } = useContext(AppContext);

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
            onClick={async () => {
              try {
                const fAmount = await convertGhsToEth(50)
                if (confirm(`You are about pay ${fAmount.toFixed(5)} ETH`)) {
                  setOpenLoading(true)
                  payForInsurance(fAmount).then((r) => {
                    setTxHash(r.transactionHash)
                  }).catch((e) => {
                    setOpenLoading(false)
                    alert(e.message.toString().includes("insufficient funds for gas")
                      ? "Insufficient balance to process this transaction. Please top up your wallet and try again."
                      : e.message)
                  });
                }
              } catch (error) {
                setOpenLoading(!openLoading)
                console.error(error)
              }
              //fetch("/api/hello").then((res) => res.json()).then(console.log)
            }}
          >
            Data click
          </button>
        </div>
        {/* <Toaster /> */}
      </div>

      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={openLoading}
        sx={{
          padding: "40px"
        }}>
        <Box sx={{
          padding: "40px"
        }}>
          <DialogTitle className="text-center font-bold text-2xl mb-4">{txHash ? "Transaction sent successfully" : "Processing transaction..."}</DialogTitle>
          <Stack justifyContent={"center"} alignItems={"center"} className="w-full">
            {
              txHash ? (
                <Stack justifyContent={"center"} alignItems={"center"} spacing={2} className="w-full">
                  <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">
                    <p className="underline text-blue-700 font-bold text-md">View transaction on EtherScan</p>
                  </a>
                  <Button
                    onClick={() => {

                    }}
                    className="bg-[#FFC700] hover:bg-[#ebc745] text-[#000000] px-4 py-2 rounded-[30px]" >
                    Go to Dashboard
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenLoading(false)
                    }}
                    color="error" variant="text" >
                    Close
                  </Button>
                </Stack>
              ) : (
                <>
                  <CircularProgress
                    color="warning"
                    size={50}
                  />
                </>
              )
            }

          </Stack>
        </Box>
      </Dialog>

    </>
  );
};

export default Nav;