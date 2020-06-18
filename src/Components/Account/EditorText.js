import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

import {
  //   Input,
  Button,
  // , notification
} from "antd";

// import api from "./api.service.js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./style.css";
import "antd/dist/antd.css";

const styles = {
  editor: {
    border: "1px solid gray",
    minHeight: "6em",
  },
};

const EditorText = (props) => {
  useEffect(() => {
    sendMail();
  });
  // console.log(props.setAllDiscription);
  const { setAllDiscription, allDiscription = "" } = props;

  // const html2 = `<p>Lorem ipsum <b>dolor</b> sit amet, <i>consectetuer adipiscing elit.</i></p>
  // <p>Aenean commodo ligula eget dolor. <b><i>Aenean massa.</i></b></p>`;

  const blocksFromHTML = convertFromHTML(allDiscription);
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [state, setState] = useState({
    editorState: EditorState.createWithContent(
      content
      // ContentState.createFromText(allDiscription)
    ),
  });
  const [rend, setRend] = useState("Проверяемый текст");
  const onEditorStateChange = (editorState) => {
    setState({
      editorState,
    });
  };

  const sendMail = () => {
    const html = draftToHtml(
      convertToRaw(state.editorState.getCurrentContent())
    );
    console.log(html);
    setRend(html);
    setAllDiscription(html);
  };

  return (
    <div className="main-box">
      <h2>Подробное описание</h2>
      <div
        className="m-10"
        style={styles.editor}
        //   onClick={focusEditor}
      >
        <Editor
          // editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: rend }}></div>
      <Button className="m-10" onClick={() => sendMail()}>
        Проверка текста
      </Button>
    </div>
  );
};

export default EditorText;
