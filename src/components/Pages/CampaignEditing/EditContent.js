import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Patch } from "../../../scripts";
import PublicContent from "../PublicCampaign/PublicContent";
import ContentEditor from "./ContentEditor";
import "./EditContent.css";

const emptyContent = {
  type: "Header",
  content: "Default Content",
};

const EditContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    console.log(contents.splice(index, 0, content));
    setContents(contents);
    setShowingEditor(false);
  };

  const deleteContent = () => {
    console.log(contents.splice(contentToBeEdited.index, 1));
    setContents(contents);
    setShowingEditor(false);
  };

  const cancelEdit = () => {
    setShowingEditor(false);
  };

  const saveContents = async () => {
    // PATCH to db with updated campaign.
    if (campaign.publishDate) {
      // TODO: publishing
      // Patch("/publishedCampaigns/Content")
    } else {
      Patch(`/unpublishedCampaigns/content/${campaign._id}/${location.state.userID}`, { content: contents })
        .then((updatedCampaign) => {
          const newCampaign = { ...campaign, ...updatedCampaign };
          newCampaign.content = updatedCampaign.content;
          console.log(newCampaign);
          setCampaign(newCampaign);
          // make sure to update react location state before leaving!
          navigate(`/unpublishedCampaign/Overview/` + updatedCampaign._id, { state: { ...location.state, campaign: newCampaign } });
        })
        .catch((error) => {
          console.error(error);
          console.alert(error.response.data.message);
        });
    }
  };

  return (
    <div className="flex-column white">
      {contents.map((content, i) => {
        // TODO: Make this content display similar to how Content is displayed on PublicCampaign
        return (
          <div key={i}>
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
            <div className="edit-content-content">
              <PublicContent content={content}></PublicContent>
              <button
                onClick={() => {
                  showEditor(content, i, false);
                }}
              >
                EDIT
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
        APPEND NEW
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
