import React from "react";
import { useEffect, useState } from "react";
import "./ContentEditor.css";

const ValidContentTypes = {
  Header: true,
  SubHeader: true,
  Paragraph: true,
  Image: true,
  Video: true,
};

const ContentEditor = ({ data, saveEdit, cancelEdit, insertEdit, deleteContent }) => {
  const [state, setState] = useState(data.content);

  useEffect(() => {
    console.log(state);
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const trySave = () => {
    // just make sure that the reward values are OK before saving.
    if (!ValidContentTypes[state.type]) {
      alert("Provide a valid Content Type!");
      return;
    }
    // do other checks

    data.isInsert ? insertEdit(state, data.index) : saveEdit(state, data.index);
  };
  // TODO: MAKE IT SO THEY CAN ONLY PUT IN THE RIGHT TYPES
  return (
    <div className="flex-column white content-editor-container">
      <div>
        <label>Content Type</label>
        <input name="type" onChange={handleChange} type="text" defaultValue={state.type} />
      </div>
      <div>
        <label>Content</label>
        <input name="content" onChange={handleChange} type="text" defaultValue={state.content} />
      </div>
      <button onClick={trySave}>SAVE</button>
      <button onClick={cancelEdit}>CANCEL</button>
      {data.isInsert ? "" : <button onClick={deleteContent}>DELETE</button>}
    </div>
  );
};
export default ContentEditor;
