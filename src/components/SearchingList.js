import React from 'react'
import { BsXLg } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";
function SearchingList({filteredData, createMarkup, checkOpenWatching,setNewWatchingNote,openSearchedList, handleSearchList}) {

    const handleOpenWatchingOnSearch = (value) => {
        let UpdateWatchingNoteOnSearch = filteredData.filter((currentValueSR) => currentValueSR.title === value.title)
        setNewWatchingNote([...UpdateWatchingNoteOnSearch]);
        checkOpenWatching();
    }

  return (
    <>
        <div className={`${openSearchedList} w-full h-full bg-green-100 rounded-md overflow-hidden shadow-xl absolute top-0 left-0`}>
                    <div className='Note-List-Header px-4 py-3 border-b flex justify-between select-none'>
                          <h2 className='font-bold text-lg'>Searching List: </h2>
                          <div className={`flex items-center cursor-pointer px-1 transition`}
                          >
                            <BsXLg className='text-red-500  hover:rotate-180 transition'
                            onClick={(e) => handleSearchList(e)}></BsXLg>
                          </div>
                         
                    </div>

                    <div className='w-full h-full px-4 py-2 overflow-y-auto scrollbar-hide pb-16 relative'>

                            {
                                filteredData.map((value, index) => {
                                    return (
                                        <div className={`${value.color} max-h-60 rounded-md py-3 px-3 relative transition h-fit box-shadow-note mb-4 select-none`}
                                        key = {value.title}
                                        >
                                        <div className='flex justify-between'>
                                            <h2 className='mb-2 font-bold pl-3 overflow-hidden pr-12'>{value.title}</h2>
                                            <div className=' flex flex-col-reverse items-center w-14 bg-slate-200 justify-evenly absolute h-full rounded-md top-0 right-0'>
                                            <MdOutlineOpenInNew className='text-2xl hover:scale-125 text-sky-500 transition cursor-pointer'
                                            onClick={() => handleOpenWatchingOnSearch(value)}
                                            ></MdOutlineOpenInNew>
                                            </div>
                                        </div>
                                            <p className='content pl-3 overflow-hidden pr-12 max-h-40'
                                                dangerouslySetInnerHTML={createMarkup(value.content)}
                                            ></p>
                                    </div>

                                    )
                                })
                            }
                    </div>
        </div>    
    </>
  )
}

export default SearchingList