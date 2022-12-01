import React from 'react'
import { MdCancel } from "react-icons/md";
function DeleteAlert({openDeleteAlert, checkDelecteAlert, setNoteLists,setBookmarks, setBookmarkBtn}) {
    const deleteAllNote = () => {
        setNoteLists([]);
        checkDelecteAlert();
        setBookmarks(bookmarksNote => false)
        setBookmarkBtn(BookmarkBtn => false)
  }
  return (
    <>
        
        <div className={`bg-neutral-300 z-10 absolute top-0 left-0 w-full h-full flex items-center bg-transparent-css ${openDeleteAlert}`}>
          <div className='alert-box rounded-md shadow-lg overflow-hidden'>
              <div className='h-8 border-b flex items-center justify-end'>
                  <MdCancel className='text-xl mr-2 text-red-500 hover:scale-105 cursor-pointer transition'
                    onClick={(e) => checkDelecteAlert(e)}
                  ></MdCancel>
              </div>
              <div className='flex flex-col justify-evenly h-40 w-full items-center select-none'>
                  <div className=''>
                    <h3 className='font-bold'>Are you sure you want to delete all notes?</h3>
                    <h4 className='font-bold text-red-500'>Your data cannot be recovered!</h4>
                  </div>
                  <div className='w-40 flex justify-between '>
                        <button type="" className=' w-12 h-6 border-2 hover:border-green-400 flex justify-center items-center rounded-md transition hover:bg-green-400'
                         onClick={(e) => checkDelecteAlert(e)}>No</button>
                        <button type="" className=' w-12 h-6 border-2 hover:border-red-400 flex justify-center items-center rounded-md transition hover:bg-red-400'
                        onClick={(e) => deleteAllNote(e)}>Yes</button>
                  </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default DeleteAlert