import React from 'react'
import { FcSearch, FcPlus, FcBookmark, } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
function NavigateBar({NoteLists, checkAddNote, checkDeleteAlert, searchWord,checkDetectNotes, addBookmarks, yellowForNewNotes, yellowForBookmarkBtn, yellowForDeleteBtn, onChangeSearch}) {

  return (
    <>
        <div className='width-240px px-2  bg-slate-200 rounded-md select-none'>
                      <div>
                          <div className='Search mt-2 bg-white flex pl-4 items-center py-4 rounded-md shadow-lg'>
                                <FcSearch className='mr-2 text-xl'></FcSearch>
                                <input type="" name="" placeholder='Type to search' className='border-none outline-none'
                                onChange={(e) => onChangeSearch(e)}
                                value = {searchWord}
                                ></input>
                          </div>
                          <div className={`add-note  mt-2  bg-white flex pl-4 items-center py-4 rounded-md shadow-lg cursor-pointer transition hover:bg-yellow-50 ${yellowForNewNotes} `}
                              onClick={(e) => checkAddNote(e)}>
                                <FcPlus className='mr-2 text-lg'></FcPlus>
                                <button type="" className='font-bold'>Add new notes</button>
                          </div>
                          <div className={`Star-notes mt-2  bg-white flex pl-4 items-center py-4 rounded-md shadow-lg cursor-pointer transition hover:bg-yellow-50 ${yellowForBookmarkBtn}`}
                              onClick={(e) => addBookmarks(e)}
                          >
                                <FcBookmark className='mr-2 text-lg'></FcBookmark>
                                <button type="" className='font-bold' >Bookmarks</button>
                          </div>
                          
                          <div className={`only:Delete-note mt-2  bg-white flex pl-4 items-center py-4 rounded-md shadow-lg cursor-pointer transition hover:bg-yellow-50 ${yellowForDeleteBtn} `}
                              onClick={(e) => 
                              {
                                    if (NoteLists.length === 0) {
                                          checkDetectNotes(e)
                                    } else {
                                          checkDeleteAlert(e)
                                    }
                              }}
                           >
                                <MdDeleteForever className='mr-2 text-xl text-blue-800'></MdDeleteForever>
                                <button type="" className='font-bold'>Delete All</button>
                          </div>
                      </div>

                      {/* <div>
                            <div className='Star-notes mt-2  bg-white flex pl-4 items-center py-4  rounded-md shadow-lg cursor-pointer transition hover:scale-105 bottom-0 mb-2'> 
                                  <FcSettings className='mr-2 text-xl'></FcSettings>
                                  <button type="" className='font-bold'>Setting</button>
                            </div>  
                      </div> */}
                  </div>
    </>
  )
}

export default NavigateBar