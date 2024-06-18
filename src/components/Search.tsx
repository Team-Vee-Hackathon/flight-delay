'use client'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React, { useState } from 'react';

const Search = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [size, setSize] = React.useState('xl');

    //modal sizes
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
    const handleOpen = (size: any) => {
        setSize(size)
        onOpen();
      }

    //route to login
    const toLogin = () => {
        window.location.href='/login'
    }
    
    
  return (
    <div className='h-[100vh] bg-black mt-24 flex '>
        <div className='flex flex-col gap-[2rem]  '>
            <div>
                <p className='text-white  text-[20px] ml-[6rem] font-bold'>Lot's of flights. One Simple Search</p>
            </div>
            <div className='flex items-center ml-[6rem] gap-1'>
                <div className='flex flex-col rounded-l-[20px] cursor-pointer bg-white p-4 w-[12vw] gap-4'>
                    <p className='text-[12px]'>From</p>
                    <input type="text" placeholder='country,city or airpot' className='outline-none text-[12px] ' />
                    {/* <p className='font-bold text-[12px]'>Accra (ACC)</p> */}
                </div>
                <div className='bg-white flex items-center justify-center cursor-pointer border-[3.5px] border-black h-[40px] w-[40px] rounded-full absolute ml-[8.5rem] '>
                <ArrowForwardIos className='text-[14px]'/>
                   <ArrowBackIos className='text-[14px]'/>
                </div>
                <div className='flex flex-col bg-white cursor-pointer p-4 w-[15vw] gap-4'>
                    <p className='text-[12px] ml-2'>To</p>
                    <input type="text" placeholder='country,city or airpot' className='outline-none text-[12px] ' />
                    {/* <p className='font-bold text-[12px] ml-2'>Country City or Airpot</p> */}
                </div>
                <div className='flex flex-col bg-white cursor-pointer p-4 w-[12vw] gap-4'>
                    <p className='text-[12px]'>Depart</p>
                    <input type="date" placeholder='Add date' className='text-[12px] outline-none'  />
                    {/* <p className='font-bold text-[12px]'>Add date</p> */}
                </div>
                <div className='flex flex-col bg-white cursor-pointer p-4 w-[12vw] gap-4'>
                    <p className='text-[12px]'>Return</p>
                    <input type="date" placeholder='Add date' className='text-[12px] outline-none'  />
                    {/* <p className='font-bold text-[12px]'>Add date</p> */}
                </div>
                <div className='flex flex-col bg-white cursor-pointer p-4 w-[18vw] rounded-r-[20px] gap-4'>
                    <p className='text-[12px]'>Travelers & Cabin Class</p>
                    <p className='text-[12px]'>1 Adult, Economy</p>
                </div>          
                <Button onPress={onOpen} className='bg-[#FFC700] items-center cursor-pointer hover:bg-[#ebc745] justify-center w-[8vw] rounded-[20px] ml-[1rem] flex flex-col p-3 h-[15vh]'>
                    <p className='text-[12px] font-bold'>Search</p>
                    <p className='text-[12px] font-bold'>Flights</p>
                </Button>

                {/* search Modal */}
                <Modal className='bg-[#F2F2F2F2]  rounded-[20px] h-[80vh]' isOpen={isOpen} onOpenChange={onOpenChange} size={size} >
                    <ModalContent className='p-4 '>
                        {(_onClose) => (
                            <>
                                <ModalHeader className='flex flex-col items-center'>
                                    <p className='text-[20px]'>Available Flights</p>
                                    <p className='text-[12px] text-gray-400'>*Flights Insurance prices may vary</p>
                                </ModalHeader>
                                <ModalBody className='flex flex-col gap-6'>
                                    <div className='flex gap-4 items-center bg-white w-[35vw] border-[1px] border-gray-400  rounded-[20px] p-4 gap-2'>
                                        <div>
                                            <img className='h-[3vh]' src="/awa.png" alt="awa logo" />
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-[12px]'>19:00</p>
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
                                                <p className='text-[12px]'>19:00</p>
                                                <p className='text-[10px]'>KMS</p>
                                            </div>
                                        </div>
                                        <div className='w-[1px] h-[12vh] bg-gray-400'></div>
                                        <div className='flex flex-col items-center '>
                                            <p className='text-[8px]'>Delay Insurance</p>
                                            <p className='text-[15px] font-bold'>GHC 500</p>
                                            <button onClick={()=> toLogin()}  className='bg-blue-900 text-white p-[4px] w-[15vw] text-center text-[10px] w-[6vw] rounded-[20px] hover:bg-blue-700 '>Select</button>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 items-center bg-white w-[35vw] border-[1px] border-gray-400  rounded-[20px] p-4 gap-2'>
                                        <div>
                                            <img className='h-[3vh]' src="/awa.png" alt="awa logo" />
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-[12px]'>19:00</p>
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
                                                <p className='text-[12px]'>19:00</p>
                                                <p className='text-[10px]'>KMS</p>
                                            </div>
                                        </div>
                                        <div className='w-[1px] h-[12vh] bg-gray-400'></div>
                                        <div className='flex flex-col items-center '>
                                            <p className='text-[8px]'>Delay Insurance</p>
                                            <p className='text-[15px] font-bold'>GHC 500</p>
                                            <button  className='bg-blue-900 text-white p-[4px] w-[15vw] text-center text-[10px] w-[6vw] rounded-[20px] hover:bg-blue-700 '>Select</button>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 items-center bg-white w-[35vw] border-[1px] border-gray-400  rounded-[20px] p-4 gap-2'>
                                        <div>
                                            <img className='h-[3vh]' src="/awa.png" alt="awa logo" />
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-[12px]'>19:00</p>
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
                                                <p className='text-[12px]'>19:00</p>
                                                <p className='text-[10px]'>KMS</p>
                                            </div>
                                        </div>
                                        <div className='w-[1px] h-[12vh] bg-gray-400'></div>
                                        <div className='flex flex-col items-center '>
                                            <p className='text-[8px]'>Delay Insurance</p>
                                            <p className='text-[15px] font-bold'>GHC 500</p>
                                            <button  className='bg-blue-900 text-white p-[4px] w-[15vw] text-center text-[10px] w-[6vw] rounded-[20px] hover:bg-blue-700 '>Select</button>
                                        </div>
                                    </div>
                                </ModalBody>
                            </>
                        )
                            
                        }
                    </ModalContent>
                </Modal>
                
            </div>
            <div className='flex flex-col gap-2 ml-[6rem]'>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                             <input className='border-none' type="checkbox" />
                             <label className='text-white text-[12px]' htmlFor="">Add Nearby Airpots </label>
                        </div>
                        <div className='flex items-center gap-2'>
                             <input className='border-none' type="checkbox" />
                             <label className='text-white text-[12px]' htmlFor="">Add Nearby Airpots </label>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input className='border-none' type="checkbox" />
                        <label className='text-white text-[12px]' htmlFor="">Direct flights</label>
                    </div>
            </div>

            </div>
    </div>
  )
}

export default Search