import React from 'react'
import { BsFillBookmarkFill, BsXLg } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";
function BookmarksList({NoteLists, createMarkup, checkOpenWatching, setNewWatchingNote, setNoteLists, setBookmarkBtn, setBookmarks,openBookmarks,BookmarksListStage, setBookmarksList, creatBookmarksList}) {
    
    const DeleteBookmarks = (value) => {
        creatBookmarksList();
        let newNoteList = NoteLists.map((currentvalue, index) => {
            if(currentvalue.title === value.title) {
                currentvalue.bookmarks = false
                currentvalue.color = "bg-slate-100"
                currentvalue.btnBookmarks = "text-slate-400"
                currentvalue.status = "hidden"
                console.log(currentvalue);
            }
            return {
                ...currentvalue
            }
        })
        setNoteLists([...newNoteList].reverse())
    }

    const handleOpenWatchingNoteOnBookmarks = (value) => {
        let UpdateWatchingNoteOnBookmarks = BookmarksListStage.filter((currentValueBM) => currentValueBM.title === value.title)
        setNewWatchingNote([...UpdateWatchingNoteOnBookmarks])
        checkOpenWatching()
    }

  return (
    <>
        <div className={` ${openBookmarks} w-full h-full bg-yellow-50 rounded-md overflow-hidden shadow-xl absolute top-0 left-0`}>
                    <div className='Note-List-Header px-4 py-3 border-b flex justify-between select-none'>
                          <h2 className='font-bold text-lg'>Your Bookmark{(BookmarksListStage.length === 0 || BookmarksListStage.length === 1) ? "" : "s"}:</h2>
                        <div className={`flex items-center cursor-pointer px-1 transition`}
                          >
                            <BsXLg className='text-red-500 hover:rotate-180 transition'
                            onClick={(e) => {
                                setBookmarks(bookmarksNote => false)
                                setBookmarkBtn(BookmarkBtn => false);
                            
                            }}
                            ></BsXLg>
                        </div>
                         
                    </div>

                    <div className='w-full h-full px-4 py-2 overflow-y-auto scrollbar-hide pb-16 relative'>
                        {
                            BookmarksListStage.map((value, index) => {
                                return (
                                    <div className={`rounded-md py-3 px-3 ${value.color} ${value.status} max-h-60 relative transition h-fit box-shadow-note mb-4 select-none`}
                                        key = {value.title}
                                        >
                                        <div className='flex justify-between'>
                                            <h2 className='mb-2 font-bold pl-3 overflow-hidden pr-12'>{value.title}</h2>
                                            <div className=' flex flex-col-reverse items-center w-14 bg-slate-200 justify-evenly absolute h-full rounded-md top-0 right-0'>
                                                <BsFillBookmarkFill className={`text-2xl ${value.btnBookmarks} hover:scale-125 transition cursor-pointer`}
                                                    onClick = {() => DeleteBookmarks(value)}
                                                ></BsFillBookmarkFill>
                                                 <MdOutlineOpenInNew className='text-2xl hover:scale-125 text-sky-500 transition cursor-pointer'
                                                 onClick={() => handleOpenWatchingNoteOnBookmarks(value)}
                                                 ></MdOutlineOpenInNew>
                                            </div>
                                        </div>
                                            <p className='content pl-3 overflow-hidden max-h-40 pr-12'
                                            dangerouslySetInnerHTML={createMarkup(value.content)}
                                            ></p>
                                    </div>
                                )
                            })
                        }
                    </div>
        </div>    
    </>
)}

export default BookmarksList