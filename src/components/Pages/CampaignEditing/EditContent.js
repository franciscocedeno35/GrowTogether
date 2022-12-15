import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Delete, GetImage, Patch, Post } from "../../../scripts";
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
    prepareContent(c);
  }, []);

  const prepareContent = async (campaign) => {
    const newContent = [];
    // this is to make it so newContent is a different pointer than campaign.content
    for (let i = 0; i < campaign.content.length; i++) {
      const content = campaign.content[i];
      if (content.type == "Image") {
        // we gotta grab the image from DB and store it.
        const src = await GetImage(content.content);
        content.imageSrc = src;
      }
      if (content.type == "Video") {
        content.videoURL = content.content;
      }
      newContent.push(content);
    }
    setContents(newContent);
  };

  const showEditor = (content, index, isInsert) => {
    setContentToBeEdited({ content: content, index: index, isInsert: isInsert });
    setShowingEditor(true);
  };

  const saveEdit = (content, index) => {
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
    // process images
    const newContent = [];
    for (let i = 0; i < contents.length; i++) {
      // identify which images are new and save them.
      // unfortunately, if an image content is overwritten or deleted, we'll never know and they will clog up the DB.
      // we can solve this by having it so that edits, inserts, and appends are all saved once you leave the Editor
      // this has an unintended side effect where the user cannot see how their content may look. So I will just keep it this way until decided otherwise.
      let content = contents[i];
      if (content.type == "Image") {
        if (content.imageFile) {
          // imageFiles only exist if this was uploaded during an edit phase.
          // upload the image, get the new imageID, and save it as the content.
          const formData = new FormData();
          formData.append("image", content.imageFile);
          const newImageID = await Post(`/images`, formData);
          content = { type: "Image", content: newImageID };
        } else {
          content = { type: "Image", content: content.content };
        }
      }
      newContent.push(content);
    }
    console.log(newContent);
    // we can assume videoURLs are valid
    const endPoint = (campaign.publishDate ? "" : "un") + "publishedCampaigns/content/" + campaign._id + "/" + location.state.userID;
    Patch(endPoint, { content: newContent })
      .then((updatedCampaign) => {
        const newCampaign = { ...campaign, ...updatedCampaign };
        newCampaign.content = updatedCampaign.content;
        console.log(newCampaign);
        setCampaign(newCampaign);
        // make sure to update react location state before leaving!
        navigate(`/Campaign/Overview/` + newCampaign._id, { state: { ...location.state, campaign: newCampaign } });
      })
      .catch((error) => {
        console.error(error);
        console.alert(error.response.data.message);
      });
  };

  return (
    <div>
      <h1 className="flex-row justify-center white" id="contentTitle">Content</h1>
      <div className="flex-column white" id="containerContent">
        {showingEditor ? (
          <ContentEditor data={contentToBeEdited} saveEdit={saveEdit} cancelEdit={cancelEdit} insertEdit={insertEdit} deleteContent={deleteContent} />
        ) : (
          ""
        )}
        {contents.map((content, i) => {
          return (
            <div key={i}>
              <div className="edit-content-content">
                <button className="additionalButtons" id="insertNew"
                  onClick={() => {
                    showEditor(emptyContent, i, true);
                  }}
                >
                  INSERT NEW CONTENT
                </button>
              </div>
              <div className="edit-content-content">
                <br></br>
                <PublicContent content={content}></PublicContent>
                <button className="additionalButtons" id="editSection"
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
        <button className="buttonsContent" id="appendNew"
          onClick={() => {
            showEditor(emptyContent, contents.length, true);
          }}
        >
          APPEND NEW
        </button>
        <button className="buttonsContent" id="saveContent" onClick={saveContents}>SAVE ALL</button>
        <Link className="buttonsContent" id="backContent" to={"/Campaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
          Back
        </Link>
      </div>
      <br></br>
    </div>
  );
};
export default EditContent;
