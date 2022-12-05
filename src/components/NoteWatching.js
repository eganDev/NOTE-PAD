import React from 'react'
import { MdCancel } from "react-icons/md";
function NoteWatching({newWatchingNote, WatchingNoteActive, checkOpenWatching, createMarkup}) {
  return (
    <>
    {
        newWatchingNote.map((watchValue) => {
            return (
                <div className={` ${WatchingNoteActive} z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent-css`}
                key = {watchValue.title}>
                    <div className='rounded-xl shadow-xl overflow-hidden mx-8'>
                        <div className={`h-fit max-w-6xl flex flex-col bg-white p-2`}>
                            <div className='flex justify-between items-center border-b select-none'>
                                <h2 className='mb-2 font-bold ml-2'>Watching Note</h2>
                                <MdCancel className='mb-2 mr-2 text-xl text-red-500 cursor-pointer hover:scale-110 transition'
                                onClick={(e) => checkOpenWatching(e)}
                                ></MdCancel> 
                            </div>
                            <div className={`flex flex-col pl-2 pr-2`}>
                                <div className='flex mt-2 border-b pr-6'>
                                    <i className='flex select-none mb-2 font-bold text-slate-400'>Title:</i>
                                    <p className='ml-8 font-semibold mb-2 max-h-24 overflow-auto'>{watchValue.title}</p>
                                </div>
                                <div className='flex pr-6 border-b mt-2 '>
                                    <i className='flex select-none mb-2 font-bold text-slate-400'>Content:</i>
                                    <p className='ml-2 mb-2 max-h-watch overflow-hidden overflow-y-auto'
                                        dangerouslySetInnerHTML={createMarkup(watchValue.content)}
                                    ></p>
                                </div>
                            </div>
                            <div className='flex w-full justify-end select-none'>
                                <h2 className='mt-2 mr-2 font-bold border-2 hover:bg-sky-300 cursor-pointer transition rounded-lg px-2 '
                                onClick={(e) => checkOpenWatching(e)}
                                >Ok</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    </>
  )
}

export default NoteWatching