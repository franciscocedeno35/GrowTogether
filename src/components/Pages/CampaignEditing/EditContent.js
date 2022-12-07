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
  const [contentToBeEdited, setContentToBeEdited] = useState({ content: emptyContent, index: 0, isInsert: false });

  useEffect(() => {
    const c = location.state.campaign;
    console.log(c);
    setCampaign(c);
    const newContent = [];
    // this is to make it so newContent is a different pointer than campaign.content
    c.content.forEach((content) => {
      newContent.push(content);
    });
    setContents(newContent);
  }, []);

  const showEditor = (content, index, isInsert) => {
    setContentToBeEdited({ content: content, index: index, isInsert: isInsert });
    setShowingEditor(true);
  };

  // TODO: MAKE THIS INSERT IF THIS IS AN INSERT
  const saveEdit = (content, index) => {
    // meow
    // const contents = contents;
    if (index >= contents.length) {
      console.log(contents.push(content));
    } else {
      contents[index] = content;
    }
    setContents(contents);
    setShowingEditor(false);
  };

  const insertEdit = (content, index) => {
    // meow
    // const contents = contents;
    console.log(contents.splice(index, 0, content));
    setContents(contents);
    setShowingEditor(false);
  };

  const deleteContent = () => {
    // const contents = contents;
    console.log(contents.splice(contentToBeEdited.index, 1));
    setContents(contents);
    setShowingEditor(false);
  };

  const cancelEdit = () => {
    setShowingEditor(false);
  };

  const saveContents = () => {
    // update campaign state
    // make sure to update react location state before leaving!
    // PATCH to db with updated campaign.
  };

  return (
    <div className="flex-column white">
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
                  showEditor(content, i, false);
                }}
              >
                EDIT
              </button>
            </div>
            <div className="edit-content-content">
              <button
                onClick={() => {
                  //TODO: CHANGE THIS TO INSERT AT THIS LOCATION
                  showEditor(emptyContent, i, true);
                }}
              >
                INSERT NEW
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => {
          showEditor(emptyContent, contents.length, true);
        }}
      >
        CREATE NEW
      </button>
      <button onClick={saveContents}>SAVE</button>
      <Link to={"/unpublishedCampaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
        CANCEL
      </Link>
      {showingEditor ? (
        <ContentEditor data={contentToBeEdited} saveEdit={saveEdit} cancelEdit={cancelEdit} insertEdit={insertEdit} deleteContent={deleteContent} />
      ) : (
        ""
      )}
    </div>
  );
};
export default EditContent;
