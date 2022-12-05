import React from 'react'
import {AiFillEdit } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { MdOutlineOpenInNew } from "react-icons/md";
import { ColorList } from '../asset/ColorNote.js';
import BookmarksList from './BookmarksList.js';
import SearchingList from './SearchingList.js';
function NoteList({NoteLists, checkOpenWatching,createMarkup, setNewWatchingNote,setBookmarkBtn,openSearchedList, checkBtnClick, checkBtnEdit, activeButton, setBtnEdit,setBtnActive, openDelectBtn, handleSearchList, setNoteLists, setBookmarks,filteredData,openBookmarks,BookmarksListStage, addBookmarks, setBookmarksList, creatBookmarksList}) {
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
    const handleOpenWatchingNote = (notes) => {
          let UpdateWatchingNote = NoteLists.filter((currentValue, index) => currentValue.title === notes.title);
          setNewWatchingNote([...UpdateWatchingNote]);
          checkOpenWatching();
    }

  return (
    <>  

        <div className='width-650px ml-2 bg-white rounded-md m-2 overflow-hidden box-shadow-component relative'>
                    <div className='Note-List-Header px-4 py-3 border-b flex justify-between select-none'>
                          <h2 className='font-bold text-lg'>Your Notes:</h2>
                        <div className={`flex items-center cursor-pointer hover:bg-slate-200 ${NoteLists.length === 0 ? "hidden" : ""} rounded-md px-1 transition ${activeButton}`}
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
                            >Edit</button>
                            
                        </div>
                         
                    </div>

                    <div className='w-full h-full px-4 py-2  overflow-y-auto scrollbar-hide pb-16 relative'>
                      {
                        NoteLists.map((notes, index) => (
                          <div className={` ${notes.color} max-h-60 rounded-md py-3 px-3 relative transition h-fit box-shadow-note mb-4 select-none `}
                                key = {notes.title}
                          >
                          <div className='flex justify-between'>
                              <h2 className='mb-2 font-bold pl-3 overflow-hidden pr-12 max-h-12'>{notes.title}</h2>
                              <div className=' flex flex-col-reverse items-center w-14 bg-slate-200 justify-evenly absolute h-full rounded-md top-0 right-0'>
                                  {<BsFillBookmarkFill className={`text-2xl ${notes.btnBookmarks} hover:scale-125 transition cursor-pointer`}
                                  onClick={(e) => {
                                    handleBookmarks(index);                                  
                                  }}
                                  ></BsFillBookmarkFill>}
                                  <MdOutlineOpenInNew className='text-2xl hover:scale-125 text-sky-500 transition cursor-pointer'
                                  onClick={() => handleOpenWatchingNote(notes)}
                                  ></MdOutlineOpenInNew>
                                  <TiDelete className={`text-2xl text-red-500 hover:scale-125 transition cursor-pointer absolute -top-2 -right-2 ${openDelectBtn}`}
                                            onClick={() => deleteNote(index)}
                                  ></TiDelete>
                              </div>
                          </div>
                              <p className='content pl-3 pr-12 max-h-40 overflow-hidden' dangerouslySetInnerHTML={createMarkup(notes.content)}
                              ></p>
                          </div>
                        ))
                      } 
                    </div>

                    {/* <div className='absolute h-12 bg-white w-full left-0 top-0'>
                       <h3>dqoeuouoiwer</h3>
                    </div> */}
                  <BookmarksList
                  openBookmarks = {openBookmarks}
                  addBookmarks = {(e) => addBookmarks(e)}
                  NoteLists = {NoteLists}
                  createMarkup = {(e) => createMarkup(e)}
                  setNoteLists = {setNoteLists}
                  BookmarksListStage = {BookmarksListStage}
                  setBookmarksList = {setBookmarksList}
                  creatBookmarksList = { (e) => creatBookmarksList(e)}
                  setBookmarks = {setBookmarks}
                  setBookmarkBtn = {setBookmarkBtn}
                  setBtnActive = {setBtnActive}
                  checkOpenWatching = {(e) => checkOpenWatching(e)}
                  setNewWatchingNote = {setNewWatchingNote}
                  ></BookmarksList>
                  {
                        filteredData.length !== 0 && (
                          <SearchingList
                          filteredData = {filteredData}
                          createMarkup = {(e) => createMarkup(e)}
                          openSearchedList = {openSearchedList}
                          handleSearchList = {(e) => handleSearchList(e)}
                          setNewWatchingNote = {setNewWatchingNote}
                          checkOpenWatching = {(e) => checkOpenWatching(e)}
                           ></SearchingList>
                        )
                  }
        </div>
    </>
  )
}

export default NoteList