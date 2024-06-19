"use client";
import { Dashboard, LogoutOutlined } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import {
  Button
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import ZKPasPic from '../../public/zkpass.png'

const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardPage = () => {
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const returnHome = () => {
    router.push("/");
  };

  return (
    <div className="flex  min-h-screen">
      <div className="bg-black h-[100vh] flex flex-col items-center  gap-[20rem] p-8 w-[50w] ">
        <div className="flex flex-col mt-4 gap-3 items-center">
          <img className="h-[5vh]" src="/aya.png" alt="aya logo" />
          <div className="flex items-center gap-1 justify-center">
            <p className="text-[10px] text-[#FFFF]">Powered by</p>
            <Image
              height={15}
              width={70}
              className="h-[20px]"
              src="/zkpass.png"
              alt=""
            />
          </div>
          <div className="mt-[2rem]">
            <Button
              onClick={() => returnHome()}
              className="text-white text-[12px] bg-[#FFFFFF1A] w-[15vw] rounded-[20px] p-2"
            >
              Home
            </Button>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              if (confirm("Are you sure you want to disconnect your wallet?")) {
                // disconnect()
                returnHome();
              }
            }}
            className="text-white text-[12px]"
          >
            Disconnect Wallet
          </Button>
        </div>
      </div>
      <div className="p-[3rem]  flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-bold ">My Current Flights</p>
          <div className="h-[1px] bg-[#ccc] w-[70vw]"></div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="h-[50vh] w-[35vw] rounded-[20px] cursor-pointer flex flex-col items-center gap-[10rem] border-[1px] bg-black status"
          >
            <div className="w-[12vw] flex items-center justify-center mt-4 rounded-[20px] bg-[#FFC700] ">
              <p className="text-[12px]">Flight status: Delayed</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[1px] w-[12vw] bg-[#ccc]"></div>
              <div className="flex gap-4 items-center   border-gray-400  rounded-[20px] p-4 gap-2">
                <div className="flex flex-col items-center">
                  <p className="text-[15px]">19:00</p>
                  <p className="text-[10px]">ACC</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[10px]">Oh 45</p>
                  <div className="flex items-center gap-2">
                    <div className="w-[10vw] h-[1px] bg-gray-400"></div>
                    <img className="h-[2vh]" src="/Vector.png" alt="flight" />
                  </div>
                  <p className="text-[10px] text-blue-800">Direct</p>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    <p className="text-[15px]">19:00</p>
                    <p className="text-[10px]">KMS</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F0F0F0] flex items-center justify-center w-[10vw] rounded-[20px]">
                <p className="text-[10px]">17th June 2024</p>
              </div>
            </div>
          </Button>

          {/* Modal */}
          {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='h-[70vh]'>
                        <ModalContent>
                            {(onClose)=>(
                                <>
                                    <ModalBody className='modal'>

                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>

                    </Modal> */}

          <Dialog
           TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              setIsOpen(!isOpen);
            }}
            open={isOpen}
          >
            {/* <DialogTitle>
                            <p>Hi</p>
                        </DialogTitle> */}
            <>
              <div className="status h-[70vh] flex flex-col  items-center justify-center w-[35vw]">
                <div className="flex flex-col items-center mt-[7rem] p-4 bg-white ">
                  <div className="flex gap-4 items-center bg-white  border-gray-400  rounded-[20px] p-4 gap-2">
                    <div className="flex flex-col items-center">
                      <p className="text-[15px]">19:00</p>
                      <p className="text-[10px]">ACC</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[10px]">Oh 45</p>
                      <div className="flex items-center gap-2">
                        <div className="w-[10vw] h-[1px] bg-gray-400"></div>
                        <img
                          className="h-[2vh]"
                          src="/Vector.png"
                          alt="flight"
                        />
                      </div>
                      <p className="text-[10px] text-blue-800">Direct</p>
                    </div>
                    <div>
                      <div className="flex flex-col items-center">
                        <p className="text-[15px]">19:00</p>
                        <p className="text-[10px]">KMS</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center">
                      <p className="text-[#02AE09] font-bold">
                        *Ghc500 Available in refund
                      </p>
                      <p className="text-[#02AE09] text-sm ">
                        <i>We will take 20% for fees, so you recieve *Ghc400</i>
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-8">
                      <button className="font-bold text-[12px] rounded-[8px] outline-none  p-2 w-[18vw] bg-[#FFC700]">
                        Make a claim request
                      </button>
                      <p className="text-[8px] text-[#ccc]">
                        Administrative Fee (10%): Helps us maintain efficiency
                        claims processing and keep your premiums competitive.{" "}
                        <br /> Policy Service Fee (10%): Ensures we continue
                        offering valuable flight delay coverage and 24/7
                        assistance.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </Dialog>

          <div className="h-[50vh] w-[25vw] rounded-[20px] cursor-pointer flex flex-col items-center gap-[10rem] border-[1px] bg-black status">
            <div className="w-[12vw] flex items-center justify-center mt-4 rounded-[20px] bg-[#00EF0A] ">
              <p className="text-[12px]">Flight status: Scheduled</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[1px] w-[12vw] bg-[#ccc]"></div>
              <div className="flex gap-4 items-center   border-gray-400  rounded-[20px] p-4 gap-2">
                <div className="flex flex-col items-center">
                  <p className="text-[15px]">19:00</p>
                  <p className="text-[10px]">ACC</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[10px]">Oh 45</p>
                  <div className="flex items-center gap-2">
                    <div className="w-[10vw] h-[1px] bg-gray-400"></div>
                    <img className="h-[2vh]" src="/Vector.png" alt="flight" />
                  </div>
                  <p className="text-[10px] text-blue-800">Direct</p>
                </div>
                <div>
                  <div className="flex flex-col items-center">
                    <p className="text-[15px]">19:00</p>
                    <p className="text-[10px]">KMS</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F0F0F0] flex items-center justify-center w-[10vw] rounded-[20px]">
                <p className="text-[10px]">17th June 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-2">
            <p className="font-bold ">My Past Flight Claims</p>
            <div className="h-[1px] bg-[#ccc] w-[70vw]"></div>
          </div>
          {/* <div className='h-[55vh] w-[25vw] rounded-[20px] flex flex-col items-center gap-[10rem] border-[1px] bg-black status'>
                    <div className='w-[12vw] flex items-center justify-center mt-4 rounded-[20px] bg-[#FFC700] '>
                        <p className='text-[12px]'>Flight status: Delayed</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='h-[1px] w-[12vw] bg-[#ccc]'></div>
                        <div className='flex gap-4 items-center   border-gray-400  rounded-[20px] p-4 gap-2'>
                                        
                                            <div className='flex flex-col items-center'>
                                                <p className='text-[15px]'>19:00</p>
                                                <p className='text-[10px]'>ACC</p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <p className='text-[10px]'>Oh 45</p>
                                                <div className='flex items-center gap-2'>
                                                    <div className='w-[10vw] h-[1px] bg-gray-400'></div>
                                                    <img className='h-[2vh]' src="/Vector.png" alt="flight" />
                                                </div>
                                                <p className='text-[10px] text-blue-800'>Direct</p>
                                            </div>
                                            <div>
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-[15px]'>19:00</p>
                                                    <p className='text-[10px]'>KMS</p>
                                                </div>
                                            </div>
                        </div>
                        <div className='bg-[#F0F0F0] flex items-center justify-center w-[10vw] rounded-[20px]' >
                            <p className='text-[10px]'>17th June 2024</p>
                        </div>
                    </div>
                </div>

                <div className='h-[55vh] w-[25vw] rounded-[20px] flex flex-col items-center gap-[10rem] border-[1px] bg-black status'>
                    <div className='w-[12vw] flex items-center justify-center mt-4 rounded-[20px] bg-[#FFC700] '>
                        <p className='text-[12px]'>Flight status: Delayed</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='h-[1px] w-[12vw] bg-[#ccc]'></div>
                        <div className='flex gap-4 items-center   border-gray-400  rounded-[20px] p-4 gap-2'>
                                        
                                            <div className='flex flex-col items-center'>
                                                <p className='text-[15px]'>19:00</p>
                                                <p className='text-[10px]'>ACC</p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <p className='text-[10px]'>Oh 45</p>
                                                <div className='flex items-center gap-2'>
                                                    <div className='w-[10vw] h-[1px] bg-gray-400'></div>
                                                    <img className='h-[2vh]' src="/Vector.png" alt="flight" />
                                                </div>
                                                <p className='text-[10px] text-blue-800'>Direct</p>
                                            </div>
                                            <div>
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-[15px]'>19:00</p>
                                                    <p className='text-[10px]'>KMS</p>
                                                </div>
                                            </div>
                        </div>
                        <div className='bg-[#F0F0F0] flex items-center justify-center w-[10vw] rounded-[20px]' >
                            <p className='text-[10px]'>17th June 2024</p>
                        </div>
                    </div>
                </div>

                <div className='h-[55vh] w-[25vw] rounded-[20px] flex flex-col items-center gap-[10rem] border-[1px] bg-black status'>
                    <div className='w-[12vw] flex items-center justify-center mt-4 rounded-[20px] bg-[#FFC700] '>
                        <p className='text-[12px]'>Flight status: Delayed</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='h-[1px] w-[12vw] bg-[#ccc]'></div>
                        <div className='flex gap-4 items-center   border-gray-400  rounded-[20px] p-4 gap-2'>
                                        
                                            <div className='flex flex-col items-center'>
                                                <p className='text-[15px]'>19:00</p>
                                                <p className='text-[10px]'>ACC</p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <p className='text-[10px]'>Oh 45</p>
                                                <div className='flex items-center gap-2'>
                                                    <div className='w-[10vw] h-[1px] bg-gray-400'></div>
                                                    <img className='h-[2vh]' src="/Vector.png" alt="flight" />
                                                </div>
                                                <p className='text-[10px] text-blue-800'>Direct</p>
                                            </div>
                                            <div>
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-[15px]'>19:00</p>
                                                    <p className='text-[10px]'>KMS</p>
                                                </div>
                                            </div>
                        </div>
                        <div className='bg-[#F0F0F0] flex items-center justify-center w-[10vw] rounded-[20px]' >
                            <p className='text-[10px]'>17th June 2024</p>
                        </div>
                    </div>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
