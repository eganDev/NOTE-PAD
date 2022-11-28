import React from 'react'
import { AiOutlineStar, AiFillEdit } from "react-icons/ai";
// import htmlToDraft from 'html-to-draftjs';
// import DOMPurify from 'dompurify';
import { TiDelete } from "react-icons/ti";
function NoteList({NoteLists, createMarkup, setNoteLists, checkClickNoteTag, toggleTag}) {
    const deleteNote = (index) => {
          let MinusNote = NoteLists.filter((value, id) => id!==index);
          setNoteLists([...MinusNote].reverse());
    }

  return (
    <>
        <div className='width-650px ml-2 bg-white rounded-md m-2 overflow-hidden shadow-xl relative'>
                    <div className='Note-List-Header px-4 py-3 border-b flex justify-between'>
                          <h2 className='font-bold text-lg'>Your Notes:</h2>
                          <div className='flex items-center cursor-pointer hover:bg-slate-200 rounded-md px-1 transition'>
                            <AiFillEdit className='text-lg mr-1 text-green-800'></AiFillEdit>
                            <button type="" className='font-bold relative'>Edit</button>
                          </div>
                         
                    </div>

                    <div className='w-full h-full px-4 py-2 overflow-y-auto scrollbar-hide'>
                      {
                        NoteLists.map((notes, index) => (
                          <div className={`bg-slate-100 rounded-md py-3 px-3 transition h-fit relative overflow-hidden shadow-lg mb-4 cursor-pointer`}>
                          <div className='flex justify-between'>
                              <h2 className='mb-2 font-bold pl-3'>{notes.title}</h2>
                              <div className=' flex flex-row w-14 justify-between'>
                                  <AiOutlineStar className='text-2xl text-yellow-500 hover:scale-125 transition cursor-pointer relative'></AiOutlineStar>
                                  <TiDelete className='text-2xl text-red-500 hover:scale-125 transition cursor-pointer'
                                            onClick={() => deleteNote(index)}
                                  ></TiDelete>
                              </div>
                          </div>
                          <p className='content pl-3' dangerouslySetInnerHTML={createMarkup(notes.content)}
                          ></p>
                         </div>
                        ))
                      } 
                    </div>

        </div>
    </>
  )
}

export default NoteList