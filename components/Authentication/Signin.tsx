
import Image from "next/image";
import "@/styles/globals.css";
import React from 'react'

export const Signin = () => {
  return (
    <div>
        <div className='authbox mx-auto mb-3 rounded-[20px] mt-[99.96px] bg-contain bg-no-repeat'>
        <form className='mt-[122px]'>

          <div className="mb-5 mx-auto" style={{marginTop:'54px'}}>
            <div className='w-[fit-content]'>
            <label htmlFor="email" className='ml-[53px] mb-3'>Email</label>
            </div>
           
            <input
              className=" authinput block mx-auto appearance-none border w-[401px] h-[56px] py-2 px-3 mb-2  leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
            />
          </div>

          <div className="mb-4 mx-auto">
            <div className='w-[fit-content]'>
            <label htmlFor="password" className='ml-[53px] mb-3'>Password</label>
            </div>
         
            <input
              className=" authinput appearance-none border block mx-auto w-[401px] h-[56px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
            />

            
          </div>

          
          
        </form>
        </div>
    </div>
  )
}
