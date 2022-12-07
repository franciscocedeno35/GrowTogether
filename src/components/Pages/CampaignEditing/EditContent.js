import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ContentEditor from "./ContentEditor";
import "./EditContent.css";

const emptyContent = {
  type: "Header",
  content: "Default Content",
};

const EditContent = () => {
  const location = useLocation();
  const [showingEditor, setShowingEditor] = useState(false);
  const [campaign, setCampaign] = useState({ _id: "" });
  const [contents, setContents] = useState([]);
  const [contentToBeEdited, setContentToBeEdited] = useState({ content: emptyContent, index: 0 });

  useEffect(() => {
    const c = location.state.campaign;
    console.log(c);
    setCampaign(c);
    setContents(c.content);
  }, []);

  const showEditor = (content, index) => {
    setContentToBeEdited({ content: content, index: index });
    setShowingEditor(true);
  };

  // TODO: MAKE THIS INSERT IF THIS IS AN INSERT
  const saveEdit = (content, index) => {
    // meow
    const newContent = contents;
    if (index >= newContent.length) {
      console.log(newContent.push(content));
    } else {
      newContent[index] = content;
    }
    setContents(newContent);
    setShowingEditor(false);
  };

  const cancelEdit = () => {
    setShowingEditor(false);
  };

  const saveContents = () => {
    // send save patch
  };

  return (
    <div className="flex-column white">
      <button
        onClick={() => {
          showEditor(emptyContent, contents.length);
        }}
      >
        CREATE NEW
      </button>
      {contents.map((content, i) => {
        // TODO: Make this content display similar to how Content is displayed on PublicCampaign
        return (
          <div key={i}>
            <div className="edit-content-content">
              <div>
                <label>Content Type</label>
                <h3>{content.type}</h3>
              </div>
              <div>
                <label>Content</label>
                <h3>{content.content}</h3>
              </div>
              <button
                onClick={() => {
                  //TODO: CHANGE THIS TO INSERT AT THIS LOCATION
                  showEditor(content, i);
                }}
              >
                EDIT
              </button>
            </div>
            <button
              onClick={() => {
                //TODO: CHANGE THIS TO INSERT AT THIS LOCATION
                showEditor(content, i);
              }}
            >
              CREATE NEW
            </button>
          </div>
        );
      })}
      <button onClick={saveContents}>SAVE</button>
      <Link to={"/unpublishedCampaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
        Back
      </Link>
      {showingEditor ? <ContentEditor data={contentToBeEdited} saveEdit={saveEdit} cancelEdit={cancelEdit} /> : ""}
    </div>
  );
};
export default EditContent;
