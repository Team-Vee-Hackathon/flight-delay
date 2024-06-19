import React from 'react'
import Nav from './Nav'
import ZKPasPic from '../../public/zkpass.png'
import Image from 'next/image'

const IntroPage = () => {
  return (
    <div className='h-[150vh] flex flex-col items-center main-body'>
      <Nav />
        
      <div className="mt-[7rem] ">
        <div className="flex items-center gap-2 justify-center">
            <p className="text-[12px] text-[#FFFF]">Powered by</p>
            <Image height={40}  width={80} className="h-[20px]" src={ZKPasPic} alt="" />
        </div>
        <div>
          <p className="text-center text-[#FFC700] text-[5rem] font-bold  yellow-t">Never <br/> Miss a Moment</p>
          <p className="text-[14px] text-white text-center">Get Flight Insurance for Peace of Mind</p>
        </div>
        <div className="transparent  flex items-center justify-center mb-2 px-6 p-1 rounded-[30px] mt-[10rem] ml-[2rem] ">
          {/* <p className="text-white text-[12px]">Make a Claim</p> */}
        </div>
      </div>

    </div>
  )
}

export default IntroPage