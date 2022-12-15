import React from "react";
import { useEffect, useState } from "react";
import "./ContentEditor.css";

const ValidContentTypes = ["Header", "Paragraph", "Image", "Video"];

const ContentEditor = ({ data, saveEdit, cancelEdit, insertEdit, deleteContent }) => {
  const [state, setState] = useState(data.content);
  const [image, setImage] = useState({ imageSrc: data.content.imageSrc });
  const [videoURL, setVideoURL] = useState(data.content.videoURL);

  useEffect(() => {
    console.log(state);
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  const handleImage = (e) => {
    setImage({ imageSrc: URL.createObjectURL(e.target.files[0]), imageFile: e.target.files[0] });
  };

  const handleVideo = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    validateYouTubeUrl(e.target.value);
  };

  const validateYouTubeUrl = function (url) {
    if (url && url != undefined && url != "") {
      console.log(url);
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        // Do anything for being valid
        // if need to change the url to embed url then use below line
        setVideoURL("https://www.youtube.com/embed/" + match[2] + "?autoplay=1&enablejsapi=1");
      } else {
        setVideoURL();
      }
    }
  };

  const trySave = () => {
    console.log(state.type);
    if (!ValidContentTypes.includes(state.type)) {
      alert("Provide a valid Content Type!");
      return;
    }
    switch (state.type) {
      case "Image": {
        if (image.imageFile) {
          // we know that the user has uploaded a new image.
          const newContent = {
            type: "Image",
            content: image,
            imageSrc: image.imageSrc,
            imageFile: image.imageFile,
          };
          data.isInsert ? insertEdit(newContent, data.index) : saveEdit(newContent, data.index);
          return;
        } else {
          if (image.imageSrc) {
            // this content was originally an image, but did not upload a new image. So we're just going to keep what was there originally.
            cancelEdit();
            return;
          } else {
            // this content was not originally an image, and the user did not upload a new image.
            alert("Upload a New Image");
            return;
          }
        }
      }
      case "Video": {
        console.log(videoURL);
        if (videoURL) {
          // youtubeURL validator has confirmed that this is a valid URL.
          const newContent = {
            type: "Video",
            content: videoURL,
            videoURL: videoURL,
          };
          data.isInsert ? insertEdit(newContent, data.index) : saveEdit(newContent, data.index);
          return;
        } else {
          // youtubeURL validator has rejected the given URL.
          alert("That is not a valid Youtube URL. Please provide a valid URL before saving.");
          return;
        }
      }
      default: {
        // just make sure that the content values are OK before saving.
        if (!state.content) {
          alert("You must provide content to display!");
          return;
        }
        data.isInsert ? insertEdit(state, data.index) : saveEdit(state, data.index);
        return;
      }
    }
  };

  const getContentInput = () => {
    switch (state.type) {
      case "Image": {
        return (
          <div className="flex-column">
            <div className="flex-row">
              <h3 className="create-reward-label">Image</h3>
              <input
                className="create-reward-input"
                id="content-editor-image-input"
                name="content"
                onChange={handleImage}
                type="file"
                defaultValue={""}
              ></input>
            </div>
            {image.imageSrc ? <img src={image.imageSrc} className="image-limiter" /> : ""}
          </div>
        );
      }
      case "Video": {
        return (
          <div className="flex-column">
            <div className="flex-row">
              <h3 className="create-reward-label">YouTube URL:</h3>
              <input className="create-reward-input" name="content" onChange={handleVideo} type="text" defaultValue={state.content} />
            </div>
            <iframe className="video-preview" src={videoURL} type="text/html" width="500" height="265" allowFullScreen></iframe>
          </div>
        );
      }
      default: {
        return (
          <div className="flex-row">
            <h3 className="create-reward-label">Content</h3>
            <input className="create-reward-input" name="content" onChange={handleChange} type="text" defaultValue={state.content} />
          </div>
        );
      }
    }
  };

  return (
    <div className="content-editor-container-container">
      <div className="flex-column white content-editor-container">
        <div className="content-editor-background">
          <h1 id="content-editor-title">Content Editor</h1>
          <div className="flex-row">
            <h3 className="create-reward-label">Content Type</h3>
            <select name="type" onChange={handleChange} defaultValue={state.type} className="create-reward-input">
              {ValidContentTypes.map((type) => {
                return <option key={type}>{type}</option>;
              })}
            </select>
          </div>
          <div>{getContentInput()}</div>
          <div className="flex-column">
            <button className="buttonsEditor green-bg" onClick={trySave}>
              SAVE
            </button>
            <button className="buttonsEditor gray-bg" onClick={cancelEdit}>
              CANCEL
            </button>
            {data.isInsert ? (
              ""
            ) : (
              <button className="buttonsEditor red-bg" onClick={deleteContent}>
                DELETE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentEditor;
