import React from 'react'

const Services = () => {
  return (
    <div className='bg-black py-24'>
        <div className="min-h-screen bg-black mt-24  flex items-center justify-center">
        <div className="flex gap-2 ">
           <img className="" src="bag.png" alt=""/>
           <p className="text-[#FFC700] text-[4rem]  font-bold top-[86rem] left-[25rem] absolute">Our <br/> Services</p>
        </div> 

        <div className="absolute top-[75rem] left-[6rem]">
        <p className="text-white text-[15px] mb-[4px]">Transparency and Decentralisation</p>
          <ul className="text-white text-[15px]">
              <p>- Unbreakable Trust: Leverage the power of blockchain <br/> for an immutable and transparent claims process. </p>
          </ul>
          <ul className="text-white text-[15px]">
              <p>- Decentralised Control: Empower policyholders with <br/>complete ownership and control over their flight delay <br/>insurance data using zkpass </p>
          </ul>
      </div>

      <div className="absolute mt-[24rem] ml-[10rem] left-0">
        <p className="text-white text-[15px] mb-[4px] ">Innovation and Cost Savings:</p>
          <ul className="text-white text-[13px]">
              <p>- Next-Gen Insurance: Experience the future of insurance <br/>with blockchain-powered and zkpass-protected solution. </p>
          </ul>
          <ul className="text-white text-[13px]">
              <p>- Reduced Costs: Eliminate intermediaries and benefit from potential <br/> cost savings offered by blockchain <br/>technology. </p>
          </ul>
          <ul className="text-white text-[13px]">
              <p>- Enhanced Security: Enjoy unparalleled security for your <br/> data with zkpass and blockchain encryption. </p>
          </ul>
      </div>

      <div className="absolute top-[78rem] right-[9rem]">
        <p className="text-white text-[15px] mb-[6px]">Security and Efficiency:</p> 
          <ul className="text-white text-[13px]">
              <p>- Zero-Knowledge Proof: zkpass technology ensures your   <br/>personal data remains private while verifying your <br/>eligibility for coverage. </p>
          </ul>
          <ul className="text-white text-[13px]">
              <p>- Frictionless Claims: Streamlined claims process through <br/>secure and automated smart contracts on the <br/>blockchain. </p>
          </ul>
          <ul className="text-white text-[13px]">
              <p>- Faster Payouts: Recieve compensation quicker with <br/>automated claim settlements facilitated by blockchain </p>
          </ul>
      </div>
      </div>
    </div>
  )
}

export default Services