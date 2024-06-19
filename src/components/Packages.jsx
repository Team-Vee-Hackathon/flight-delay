import React from 'react'

const Packages = () => {
  return (
    <div>
        <div className="bg-black h-[170vh]  flex flex-col gap-[2rem]  py-[4rem] ">
        <div className="flex flex-col mt-24 items-center">
            <p className="text-[#FFC700] text-[4rem] font-bold">Packages</p>
            <p className="text-[#FFFF] text-[18px]">Explore our packages and choose which one suits you</p>
        </div>
        <div>
          <div className="flex items-center justify-center mt- gap-8">
            <div className="bg-[#191919] flex flex-col gap-2 items-center p-10 h-[95vh] w-[27vw] rounded-[20px]">
                <h4 className="text-[#FFFF]">Explorer</h4>
                <div className="flex items-center gap-2">
                  <p className="text-white text-[24px]">$10</p>
                  <p className="text-[#3D3D3D]">/per trip</p>
                </div>
                <div className="text-[12px] text-white">
                  <p>Target Audience: Budget- <br/>conscious travelers taking <br/>occasional trips.</p> <br/>
                  <p>Coverage: Up to 6 hours delay <br/> compensation, limited to domestic <br/>flights.</p>
                  <p>Additional Features: Basic real- <br/>time flight tracking, mobile app <br/>access for claim filing.</p>
                </div>
                <div className="mt-[9.5rem]">
                    <button className="border-[1px] border-white rounded-[25px] text-white text-[12px] px-[6rem] p-4">Get Started</button>
                </div>
            </div>

            <div className="bg-[#191919] flex flex-col gap-2 items-center p-10 h-[95vh] w-[27vw] rounded-[20px]">
                <h4 className="text-[#FFFF]">Globetrotter</h4>
                <div className="flex items-center gap-2">
                  <p className="text-white text-[24px]">$25</p>
                  <p className="text-[#3D3D3D]">/per trip</p>
                </div>
                <div className="text-[12px] text-white">
                  <p>Target Audience: Frequent <br/>travelers taking domestic and <br/>international trips.</p> <br/>
                  <p>Coverage: Up to 12 hours delay <br/> compensation, global coverage for  <br/> most destinations.</p> <br/>
                  <p>Additional Features: Real-time <br/>flight tracking with automatic <br/>delay notifications, 24/7 customer<br/>support, multi-language claim filing options.</p>
                </div>
                <div className="mt-[7rem]">
                    <button className="border-[1px] border-white rounded-[25px] text-white text-[12px] px-[6rem] p-4">Get Started</button>
                </div>
            </div>

            <div className="bg-[#191919] flex flex-col gap-2 items-center p-10 h-[95vh] w-[27vw] rounded-[20px]">
                <h4 className="text-[#FFFF]">Voyager Pro</h4>
                <div className="flex items-center gap-2">
                  <p className="text-white text-[24px]">$40</p>
                  <p className="text-[#3D3D3D]">/per trip</p>
                </div>
                <div className="text-[12px] text-white">
                  <p>Target Audience:Business <br/>travelers and frequent flyers who <br/>priotize comprehensive <br/>coverage.</p> <br/>
                  <p>Coverage: Up to 24 hours delay <br/> compensation, premium coverage <br/>for missed connections and  <br/>additional expenses.</p>
                  <p>Additional Features:Priority claims <br/>processing, dedicated customer  <br/>support line, access to airpot <br/> lounge network(if applicable), lost <br/>baggage insurance add-on-option .</p>
                </div>
                <div className="mt-20">
                    <button className="border-[1px] border-white rounded-[25px] text-white text-[12px] px-[6rem] p-4">Get Started</button>
                </div>
            </div>
             

          </div>
        </div>
      </div>
    </div>
  )
}

export default Packages