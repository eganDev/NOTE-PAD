import React from 'react'
import { MdCancel } from "react-icons/md";  
function TitleEmptyAlert({openTitleETAlert, checkTitle}) {
  return (
    <>
        <div className={`bg-neutral-300 z-10 absolute top-0 left-0 w-full h-full flex items-center bg-transparent-css ${openTitleETAlert}`}>
          <div className='alert-box rounded-md shadow-lg overflow-hidden'>
              <div className='h-8 border-b flex items-center justify-end mr-1'>
                  <MdCancel className='text-xl mr-1 text-red-500 hover:scale-105 cursor-pointer transition'
                             onClick={(e) => checkTitle(e)}
                  ></MdCancel>
              </div>
              <div className='flex flex-col justify-evenly h-40 w-full items-center select-none'>
                  <div className=''>
                    <h3 className='font-bold text-red-500'>Must enter note title to manage!</h3>
                  </div>
                  <div className='flex justify-between '>
                        <button type="" className=' w-12 h-6 border-2 hover:border-blue-300 flex justify-center items-center rounded-md transition hover:bg-blue-300'
                             onClick={(e) => checkTitle(e)}
                        >Ok</button>
                  </div>
              </div>
          </div>
        </div>  
    </>
  )
}

export default TitleEmptyAlert