import React from 'react'
import { MdCancel } from "react-icons/md";
function InputAlertEmpty({openNoteEmptyAlert, checkNoteEmpty, TileRef}) {
  return (
    <>
        <div className={`bg-neutral-300 z-10 absolute top-0 left-0 w-full h-full flex items-center bg-transparent-css ${openNoteEmptyAlert}`}>
          <div className='alert-box rounded-md shadow-lg overflow-hidden'>
              <div className='h-8 border-b flex items-center justify-end mr-1'>
                  <MdCancel className='text-xl mr-1 text-red-500 hover:scale-105 cursor-pointer transition'
                        onClick={(e) => checkNoteEmpty(e)}
                  ></MdCancel>
              </div>
              <div className='flex flex-col justify-evenly h-40 w-full items-center select-none'>
                  <div className=''>
                    <h3 className='font-bold text-red-500'>Oops, your note is empty!!!</h3>
                    <h3 className='font-bold'>Let's write something...</h3>
                  </div>
                  <div className='flex justify-between '>
                        <button type="" className=' w-12 h-6 border-2 hover:border-blue-300 flex justify-center items-center rounded-md transition hover:bg-blue-300'
                            onClick={(e) => {
                              checkNoteEmpty(e)
                              TileRef.current.focus()
                            }}
                        >Ok</button>
                  </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default InputAlertEmpty