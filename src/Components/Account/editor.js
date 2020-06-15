import React from "react";
import { Editor, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
class ExampleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => {
      this.setState({
        editorState,
        editorContentHtml: stateToHTML(editorState.getCurrentContent()),
      });
    };
  }
  render() {
    return (
      <div>
        <div className="editor-container" style={{ border: "1px solid #000" }}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
        <h4>Editor content as HTML</h4>
        <pre>{this.state.editorContentHtml}</pre>
      </div>
    );
  }
}
export default ExampleEditor;
