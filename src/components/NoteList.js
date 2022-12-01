import React, { useState } from 'react'
import {AiFillEdit } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { ColorList } from '../asset/ColorNote.js';
import BookmarksList from './BookmarksList.js';
function NoteList({NoteLists, createMarkup, setNoteLists, openBookmarks,BookmarksListStage, addBookmarks, setBookmarksList, creatBookmarksList}) {
    const deleteNote = (index) => {
          let MinusNote = NoteLists.filter((value, id) => id!==index);
          setNoteLists([...MinusNote].reverse());
    }

    const colorDefault = "bg-slate-100"
    const RandColor = ColorList[Math.floor(Math.random() * ColorList.length)];

    const handleBookmarks = (index) => { 
          let newBookmark = NoteLists.map((value, id) => {
              if(index === id) {
                value.bookmarks = !value.bookmarks
                let boxColor = value.bookmarks ? RandColor : colorDefault;
                value.color = boxColor;
                let btnBookmarkColor = value.bookmarks ? "text-yellow-500" : "text-slate-400";
                value.btnBookmarks = btnBookmarkColor;
                value.status = ""
                console.log(value);
              } 
              return {
                 ...value,
              }
          })
          setNoteLists([...newBookmark].reverse());
    }

    const [btnEdit, setBtnEdit] = useState(false);
    const [ButtonActive, setBtnActive] = useState(false);
    const checkBtnClick = (e) => {
      setBtnActive(ButtonActive => !ButtonActive)
    }
    const checkBtnEdit = (e) => {
      setBtnEdit(btnEdit => !btnEdit);
    }

    let openDelectBtn = btnEdit ? "" : "hidden";
    let activeButton = ButtonActive ? "bg-slate-200" : ""
    

  return (
    <>  

        <div className='width-650px ml-2 bg-white rounded-md m-2 overflow-hidden shadow-xl relative'>
                    <div className='Note-List-Header px-4 py-3 border-b flex justify-between select-none'>
                          <h2 className='font-bold text-lg'>Your Notes:</h2>
                        <div className={`flex items-center cursor-pointer hover:bg-slate-200 rounded-md px-1 transition ${activeButton}`}
                          onClick={(e) => {
                              if (NoteLists.length === 0) {
                                setBtnEdit(btnEdit => false)
                                setBtnActive(ButtonActive => false)
                              } else {
                                checkBtnEdit(e)
                                checkBtnClick(e)
                              }
                          }}
                          >
                            <AiFillEdit className='text-lg mr-1 text-green-600'></AiFillEdit>
                            <button type="" className='font-bold relative'
                            >Delete</button>
                        </div>
                         
                    </div>

                    <div className='w-full h-full px-4 py-2 overflow-y-auto scrollbar-hide pb-16'>
                      {
                        NoteLists.map((notes, index) => (
                          <div className={` ${notes.color} rounded-md py-3 px-3 relative transition h-fit shadow-lg mb-4`}
                          >
                          <div className='flex justify-between'>
                              <h2 className='mb-2 font-bold pl-3 overflow-hidden'>{notes.title}</h2>
                              <div className=' flex flex-col-reverse items-center w-14 bg-slate-200 justify-evenly absolute h-full rounded-md top-0 right-0'>
                                  {<BsFillBookmarkFill className={`text-2xl ${notes.btnBookmarks} hover:scale-110 transition cursor-pointer`}
                                  onClick={(e) => {
                                    handleBookmarks(index);                                  
                                  }}
                                  ></BsFillBookmarkFill>}
                                  <TiDelete className={`text-2xl text-red-500 hover:scale-125 transition cursor-pointer absolute -top-2 -right-2 ${openDelectBtn}`}
                                            onClick={() => deleteNote(index)}
                                  ></TiDelete>
                              </div>
                          </div>
                              <p className='content pl-3 overflow-hidden' dangerouslySetInnerHTML={createMarkup(notes.content)}
                              ></p>
                          </div>
                        ))
                      } 

                    </div>
                  <BookmarksList
                  openBookmarks = {openBookmarks}
                  addBookmarks = {(e) => addBookmarks(e)}
                  NoteLists = {NoteLists}
                  createMarkup = {(e) => createMarkup(e)}
                  setNoteLists = {setNoteLists}
                  BookmarksListStage = {BookmarksListStage}
                  setBookmarksList = {setBookmarksList}
                  creatBookmarksList = { (e) => creatBookmarksList(e)}
                  ></BookmarksList>
        </div>
    </>
  )
}

export default NoteList