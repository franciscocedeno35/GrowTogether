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
    setContents(campaign.content);
    const newContent = [];
    const contentPromises = [];
    for (let i = 0; i < campaign.content.length; i++) {
      const babyPromise = new Promise((res, rej) => {
        const content = campaign.content[i];
        console.log(content);
        if (content.type == "Image") {
          GetImage(content.content)
            .then((src) => {
              content.imageSrc = src;
              res(content);
            })
            .catch((error) => {
              console.log(`Could not find the image for content at index ${i} where the image id is ${content.content}`);
            });
        } else if (content.type == "Video") {
          content.videoURL = content.content;
          res(content);
        } else {
          res(content);
        }
      });
      contentPromises.push(babyPromise);
    }
    Promise.all(contentPromises).then((result) => {
      console.log(result);
      setContents(result);
    });
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
      {showingEditor ? (
        <ContentEditor data={contentToBeEdited} saveEdit={saveEdit} cancelEdit={cancelEdit} insertEdit={insertEdit} deleteContent={deleteContent} />
      ) : (
        ""
      )}
      <h1 className="flex-row justify-center white">{campaign.title}</h1>
      <h5 className="flex-row justify-center white">{campaign.subtitle}</h5>
      <hr className="white "></hr>
      <div className="flex-row justify-space-around ">
        <Link to={"/Campaign/Overview/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
          Overview
        </Link>
        <Link to={"/Campaign/Settings/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
          Settings
        </Link>
        <Link to={"/Campaign/Content/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
          Content
        </Link>
        {campaign.publishDate ? (
          ""
        ) : (
          <Link to={"/Campaign/Rewards/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
            Rewards
          </Link>
        )}
      </div>
      <hr className="Navbar-line"></hr>

      <h1 className="campaign-edit-title">Contents</h1>
      <div className="flex-row">
        <div className="flex-column white edit-subject">
          {contents.map((content, i) => {
            return (
              <div className="flex-column" key={i}>
                {/* <div className="edit-content-content" key={i}> */}
                <button
                  className="insertButton"
                  onClick={() => {
                    showEditor(emptyContent, i, true);
                  }}
                >
                  INSERT NEW
                </button>
                {/* </div> */}
                <div className="edit-content-content edit-subject-item">
                  <PublicContent content={content}></PublicContent>
                  <button
                    className="editButton"
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
        </div>
        <div className="flex-column edit-buttons">
          <button
            className="buttonsEditor blue-bg"
            onClick={() => {
              showEditor(emptyContent, contents.length, true);
            }}
          >
            APPEND NEW
          </button>
          <button className="buttonsEditor green-bg" onClick={saveContents}>
            SAVE
          </button>
          <Link className="buttonsEditor gray-bg" to={"/Campaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
            CANCEL
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EditContent;
