import React from 'react'
import {MdOutlineAddCircleOutline } from "react-icons/md";
function AddNote({checkAddNote, openEditMenu, closeEditMenu}) {
  return (
    <>
        <div className={`absolute  bg-white flex justify-center items-center top-0 left-0 w-full h-full rounded-md ${openEditMenu} select-none`}
            >
                <div className='flex flex-row cursor-pointer w-48 h-12 justify-center items-center'
                 onClick = {(e) => checkAddNote(e)} >
                    <MdOutlineAddCircleOutline className='text-4xl mr-2 text-slate-500'></MdOutlineAddCircleOutline>
                    <h2 className='text-xl font-bold text-slate-500'>Add new notes</h2>
                </div>
        </div>
    </>
  )
}

export default AddNote