import './App.css';
import NavigateBar from './components/NavigateBar';
import NoteList from './components/NoteList';
import DeleteAlert from './components/DeleteAlert';
import NotDetect from './components/NotDetect';
import AddNote from './components/AddNote';
// import InputField from './components/InputField';
import { useState, useMemo } from 'react';
import { MdCancel } from "react-icons/md";

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import draftToHtml from "draftjs-to-html";
import { useEffect } from 'react';

function App() {

  const [Notes, setNotes] = useState({
    title: "",
    content: "",
    bookMark: false
  })
  const [NoteLists, setNoteLists] = useState(JSON.parse(localStorage.getItem('NotesList')) ?? []);
  let NoteListsReverse = [...NoteLists].reverse();

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  useEffect(() => {
    localStorage.setItem('NotesList', JSON.stringify(NoteLists))
  }, [NoteLists]);
  
//  const [ConvertedContent,setConvertedContent] = useState('')
  
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }

  var htmlData = useMemo(
    () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
    [editorState]
  );

  console.log(htmlData);
  const convertContentToHTML = () => {
    // let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    // console.log(currentContentAsHTML);
    // setConvertedContent(currentContentAsHTML);
    setNotes({
      ...Notes,
      content: htmlData
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
  }

  const Save = () => {
    if (Notes.title === '' && Notes.content === '') {
        alert("Cannot save with empty input!")
        return
    } else if (Notes.title ===''){
        alert("Must enter title to manage!")
        return
    } else {
        SaveFunct()
    }
  }

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  console.log(NoteLists);
  //check future
  // const [checkNoteTag, setCheckNoteTag] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [DetectNote, setDetectNote] = useState(false);
  const [addNote, setAddNote] = useState(false);
  // const checkClickNoteTag = () => {
  //    setCheckNoteTag(checkNoteTag => !checkNoteTag);
  // }
  const checkDelecteAlert = () => {
    setCheckDelete(checkDelete => !checkDelete);
    console.log(checkDelete);
  }
  const checkDetectNotes = () => {
    setDetectNote(DetectNote => !DetectNote);
  }
  const checkAddNote = () => {
    setAddNote(addNote => true);
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
  // let toggleTag = checkNoteTag ? "h-fit" : "max-h-24 overflow-hidden"
  let openDeleteAlert = checkDelete ? "" : "hidden";
  let openNotesDetect = DetectNote ? "" : "hidden";
  let pointerEvenNone = checkDelete ? "pointer-events-none" : "";
  let pointerEvenNone2= DetectNote ? "pointer-events-none" : "";
  let pointerEvenNone3 = addNote ? "" : "pointer-events-none";
  let openEditMenu = addNote ? "hidden" : "";
  return (
    <>
      <div>
          <div className='w-full h-screen flex flex-col'>
              <header className=' w-full bg-slate-100 h-14 flex flex-row items-center pl-6 fixed shadow-md '>
                <h1 className='font-bold text-2xl select-none'>NOTE PAD TAKING</h1>
              </header>
              <div className='w-full h-screen pt-14 flex flex-row bg-slate-50'>

                  <NavigateBar
                  NoteLists = {NoteListsReverse}
                  setNoteLists = {setNoteLists}
                  checkDeleteAlert = {(e) => checkDelecteAlert(e)}
                  checkDetectNotes = {(e) => checkDetectNotes(e)}
                  checkAddNote = {(e) => checkAddNote(e)}
                  ></NavigateBar>
                  <NoteList 
                  NoteLists = {NoteListsReverse}
                  createMarkup = {(e) => createMarkup(e)}
                  setNoteLists = {setNoteLists}
                  // checkClickNoteTag = {(e) => checkClickNoteTag(e)}
                  // toggleTag = {toggleTag}
                  ></NoteList>   
                  
                  <DeleteAlert
                      openDeleteAlert = {openDeleteAlert}
                      checkDelecteAlert = {(e) => checkDelecteAlert(e)}
                      setNoteLists = {setNoteLists}
                    ></DeleteAlert>
                    <NotDetect
                      openNotesDetect = {openNotesDetect}
                      checkDetectNotes = {(e) => checkDetectNotes(e)}
                    ></NotDetect>

                  <div className='width-input bg-white rounded-md my-2 mr-2 overflow-hidden shadow-xl relative'>
                      <div className='Note-List-Header px-4 py-3 border-b flex justify-between'>
                            <h2 className='font-bold text-lg'>Write notes</h2>
                            <div className='flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded-md px-1 transition' onClick={(e) =>checkClose(e)}>
                                <MdCancel className='text-lg mr-1 text-red-800'></MdCancel>
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
                              editorClassName="editorClassName" />
                            </div>
                      </div>
                      <div className='flex justify-end mr-4 ml-4'>
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
