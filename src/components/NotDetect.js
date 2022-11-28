import React from 'react'
import { MdCancel } from "react-icons/md";
function NotDetect({openNotesDetect, checkDetectNotes}) {
  return (
    <>
        <div className={`bg-neutral-200 z-10 absolute top-0 left-0 w-full ${openNotesDetect} h-full flex items-center bg-transparent-css`}>
          <div className='alert-box rounded-md shadow-lg overflow-hidden'>
              <div className='h-8 border-b flex items-center justify-end mr-1'>
                  <MdCancel className='text-xl mr-1 text-red-500 hover:scale-105 cursor-pointer transition'
                    onClick={(e) => checkDetectNotes(e)}
                  ></MdCancel>
              </div>
              <div className='flex flex-col justify-evenly h-40 w-full items-center select-none'>
                  <div className=''>
                    <h3 className='font-bold'>Notes not detected! Let's try taking notes!</h3>
                  </div>
                  <div className='flex justify-between '>
                        <button type="" className=' w-12 h-6 border-2 hover:border-blue-300 flex justify-center items-center rounded-md transition hover:bg-blue-300'
                        onClick={(e) => checkDetectNotes(e)}
                        >Ok</button>
                  </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default NotDetect