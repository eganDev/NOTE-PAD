// import React, { Component } from 'react';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';


// export default class TextEditor extends Component {
//     state = {
//         editorState: EditorState.createEmpty(),
//     }
//     onEditorStateChange = (editorState) => {
//         this.setState({
//             editorState,
//         });
//     }
//   render() {
//     const {editorState} = this.state;
//     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
//     return (
//         <Editor
//         editorState={editorState}
//         toolbarClassName = "toolbarClassName"
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         placeholder='Type note contents'
//         onEditorStateChange={this.onEditorStateChange}  
//         />
//     )
//   }
// // }

// import React from 'react';
// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { convertToHTML } from 'draft-convert';
// function TextEditor({editorState, setEditorState, handleEditorChange}) {

//   return (
   
//   )
// }

// export default TextEditor