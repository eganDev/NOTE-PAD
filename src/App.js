import './App.css';
import NavigateBar from './components/NavigateBar';
import NoteList from './components/NoteList';
import DeleteAlert from './components/DeleteAlert';
import NotDetect from './components/NotDetect';
import AddNote from './components/AddNote';
import BookmarksList from './components/BookmarksList';
import { useState, useMemo } from 'react';
import { MdCancel } from "react-icons/md";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DOMPurify from 'dompurify';
import draftToHtml from "draftjs-to-html";
import { useEffect } from 'react';
import InputAlertEmpty from './components/InputAlertEmpty';
import TitleEmptyAlert from './components/TitleEmptyAlert';

function App() {
  const [Notes, setNotes] = useState({
    title: "",
    content: "",
    bookmarks: false,
    color: "bg-slate-100",
    btnBookmarks: "text-slate-400",
    status: ""
  })

  const [NoteLists, setNoteLists] = useState(JSON.parse(localStorage.getItem('NotesList')) ?? []);
  let NoteListsReverse = [...NoteLists].reverse();
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  useEffect(() => {
    localStorage.setItem('NotesList', JSON.stringify(NoteLists))
  }, [NoteLists]);
  
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }

  var htmlData = useMemo(
    () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
    [editorState]
  );

  const convertContentToHTML = () => {
    setNotes({
      ...Notes,
      content: htmlData,
    })
    
  }

  const onChangeTitle = (e) => {
      setNotes({
        ...Notes,
        title: e.target.value
      })
  }

  const SaveFunct = () => {
    setNoteLists([
        ...NoteLists,
        Notes,
    ])
    setEditorState(EditorState.createEmpty())
    setNotes({
      ...Notes,
      title: "",
      content: ""
    })
    setBookmarks(bookmarksNote => false)
    setBookmarkBtn(BookmarkBtn => false)
  }
  const Save = () => {
    if (Notes.title.trimEnd() ==='' && Notes.content === '' ) {
        checkNoteEmpty();
        return;
    } else if (Notes.title.trimEnd() ===''){
        checkTitle();
        return;
    } else {
        SaveFunct();
    }
  }

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  const [BookmarksList, setBookmarksList] = useState([])
  const creatBookmarksList = () => {
      let newBookmarksList = NoteLists.filter((value, index) => value.bookmarks === true); 
      setBookmarksList([...newBookmarksList].reverse())
  }
  console.log(BookmarksList);
  //features
  const [checkDelete, setCheckDelete] = useState(false);
  const [DetectNote, setDetectNote] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [detectInput, setDetectInput] = useState(false);
  const [detectTitleIsET, setDetectTileIsEmpty] = useState(false);
  const [bookmarksNote,setBookmarks] = useState(false);
  const [addNewNotesClick, setNewNotesClick] = useState(false);
  const [BookmarkBtn, setBookmarkBtn] = useState(false);
  const [DelectBtn, setDeleteBtn] = useState(false);

  //feature functions
  const checkDelecteAlert = () => {
    setCheckDelete(checkDelete => !checkDelete);
    onclickDeleteBtn();
  }
  const checkDetectNotes = () => {
    setDetectNote(DetectNote => !DetectNote);
    onclickDeleteBtn()
  }
  const checkAddNote = () => {
    setAddNote(addNote => true);
    changeAddNotesColor();
  }
  const checkNoteEmpty = () => {
    setDetectInput(detectInput => !detectInput);
  }
  const checkTitle = (e) => {
    setDetectTileIsEmpty(detectTitleIsET => !detectTitleIsET);
  }
  const changeAddNotesColor = () => {
    setNewNotesClick(addNewNotesClick => true);
  }
  const onlickBookmarkBtn = () => {
    setBookmarkBtn(BookmarkBtn => !BookmarkBtn);
  }
  const onclickDeleteBtn = () => {
    setDeleteBtn(DelectBtn => !DelectBtn);
  }
  const addBookmarks = (e) => {
    setBookmarks(bookmarksNote => !bookmarksNote);
    creatBookmarksList();
    onlickBookmarkBtn()
  } 

  const checkClose = () => {
    setAddNote(addNote => false)
    setEditorState(EditorState.createEmpty())
    setNotes({
      ...Notes,
      title: "",
      content: ""
    })
  }
  //feature variable
  let openDeleteAlert = checkDelete ? "" : "hidden";
  let openNotesDetect = DetectNote ? "" : "hidden";
  let pointerEvenNone = checkDelete ? "pointer-events-none" : "";
  let pointerEvenNone2= DetectNote ? "pointer-events-none" : "";
  let pointerEvenNone3 = addNote ? "" : "pointer-events-none";
  let openEditMenu = addNote ? "hidden" : "";
  let openNoteEmptyAlert = detectInput ? "" : "hidden";
  let openTitleETAlert = detectTitleIsET ? "" : "hidden";
  let changeToBookmarked = bookmarksNote ? "bg-yellow-100" : "bg-slage-100";
  let openBookmarks = bookmarksNote ? "" : "hidden";
  let yellowForNewNotes = addNewNotesClick ? "bg-yellow-50" : ""
  let yellowForBookmarkBtn = BookmarkBtn ? "bg-yellow-50" : ""
  let yellowForDeleteBtn = DelectBtn ? "bg-yellow-50" : ""
  return (
    <>
      <div >
          <div className='w-full  h-screen flex flex-col'>
              <header className=' w-full bg-slate-100 h-14 flex flex-row items-center pl-6 fixed shadow-md '>
                <h1 className='font-bold text-2xl select-none'>NOTE-PAD TAKING</h1>
              </header>
              <div className='w-full h-screen pt-14 flex flex-row bg-slate-50'>

                  <NavigateBar
                  NoteLists = {NoteListsReverse}
                  setNoteLists = {setNoteLists}
                  checkDeleteAlert = {(e) => checkDelecteAlert(e)}
                  checkDetectNotes = {(e) => checkDetectNotes(e)}
                  checkAddNote = {(e) => checkAddNote(e)}
                  openBookmarks = {openBookmarks}
                  addBookmarks = {(e) => addBookmarks(e)}
                  creatBookmarksList = {(e) => creatBookmarksList(e)}
                  yellowForNewNotes = {yellowForNewNotes}
                  yellowForBookmarkBtn = {yellowForBookmarkBtn}
                  yellowForDeleteBtn = {yellowForDeleteBtn}
                  ></NavigateBar>
                  <NoteList 
                  NoteLists = {NoteListsReverse}
                  createMarkup = {(e) => createMarkup(e)}
                  setNoteLists = {setNoteLists}
                  changeToBookmarked = {changeToBookmarked}
                  openBookmarks = {openBookmarks}
                  addBookmarks = {(e) => addBookmarks(e)}
                  BookmarksListStage = {BookmarksList}
                  setBookmarksList = {setBookmarksList}
                  creatBookmarksList = {(e) => creatBookmarksList(e)}
                  ></NoteList>   
                 
                  <DeleteAlert
                      openDeleteAlert = {openDeleteAlert}
                      checkDelecteAlert = {(e) => checkDelecteAlert(e)}
                      setNoteLists = {setNoteLists}
                  ></DeleteAlert>
                  <NotDetect
                      openNotesDetect = {openNotesDetect}
                      checkDetectNotes = {(e) => checkDetectNotes(e)}
                      checkAddNote = {(e) => checkAddNote(e)}
                  ></NotDetect>
                  <InputAlertEmpty
                      openNoteEmptyAlert = {openNoteEmptyAlert}
                      checkNoteEmpty = {(e) => checkNoteEmpty(e)} 
                  ></InputAlertEmpty>
                  <TitleEmptyAlert
                      openTitleETAlert = {openTitleETAlert}
                      checkTitle = {(e) => checkTitle(e)}
                  ></TitleEmptyAlert>

                  <div className='width-input bg-white rounded-md my-2 mr-2 overflow-hidden shadow-xl relative'>
                      <div className='Note-List-Header px-4 py-3 border-b flex justify-between select-none'>
                            <h2 className='font-bold text-lg'>Write notes</h2>
                            <div className='flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded-md px-1 transition' 
                            onClick={(e) => {
                              checkClose(e)
                              setNewNotesClick(addNewNotesClick => false)
                              }}>
                                <MdCancel className='text-xl mr-1 text-red-500'></MdCancel>
                                <button type="" className='font-bold'
                                >Cancel</button>
                            </div>
                      </div>

                      <div className='Input-Field'>
                            <div className='Tile-Content '>
                              <textarea id="freeform" name="freeform" rows="2" cols="60" className='text-lg scrollbar-hide top-8 outline-none width-95 border ml-4 mt-4 px-2 mb-2' placeholder='Type note title'
                              onChange={(e) => onChangeTitle(e)}
                              value = {Notes.title}
                              >
                              </textarea>
                            </div>
                            <div className={`Text-Editor scrollbar-hide border ml-4 mr-4 px-2 pt-2 pb-4 ${pointerEvenNone} ${pointerEvenNone2} ${pointerEvenNone3}`}>
                            <Editor editorState={editorState}
                              onEditorStateChange={handleEditorChange}
                              toolbarClassName = "toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"/>
                            </div>
                      </div>
                      <div className='flex justify-end mr-4 ml-4 select-none'>
                            <button type="" className='py-2 px-6 mt-2 rounded-lg transition bg-slate-200 font-bold shadow-md'
                            onClick={(e) => Save(e)}>Save</button>
                      </div>
                      <AddNote
                      checkAddNote = {(e) => checkAddNote(e)}
                      openEditMenu = {openEditMenu}
                      ></AddNote>
                  </div>
              </div>
          </div>

        
      </div>
    </>
  );
}

export default App;
