'use client'
import { AppContext } from '@/context/AppContext'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const Login = () => {
    const { connectWallet } = useContext(AppContext)
    const router = useRouter()
    return (
        <div className='min-h-screen flex  items-center'>
            <div className='login-photo h-[100vh] w-[65vw] '></div>
            <div className='bg-black flex gap-6 items-center flex-col h-[100vh] w-[40vw]'>
                <div className='flex flex-col items-center mt-24 gap-6 justify-center'>
                    <img src="/newlogo.png" alt="aya logo" />
                    <p className='text-white text-[10px]'>Connect your wallet continue to flight delay insurance claim system</p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <Button onClick={() => {
                        Promise.resolve(connectWallet()).then(() => {
                            router.push('/dashboard')
                        })

                    }} className='bg-[#FFC700] w-[15vw] text-[12px] p-2 rounded-[10px]'>Connect my wallet</Button>
                    <div className="flex items-center gap-1 justify-center">
                        <p className="text-[10px] text-[#FFFF]">Powered by</p>
                        <Image height={15} width={70} className="h-[20px]" src='/zkpass.png' alt="" />
                    </div>
                </div>
                <div className='mt-[13rem]'>
                    <p className='text-[#FFFFFF33] text-[10px]'>Copyright Team Vee 2024 muAccra Hackathon</p>
                </div>
            </div>
        </div>
    )
}

export default Login