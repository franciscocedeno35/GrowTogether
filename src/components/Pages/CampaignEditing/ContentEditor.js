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
          <div>
            <label>Image</label>
            <input name="content" onChange={handleImage} type="file" defaultValue={""}></input>
            {image.imageSrc ? <img src={image.imageSrc} /> : ""}
          </div>
        );
      }
      case "Video": {
        return (
          <div>
            <label>YouTube URL:</label>
            <input name="content" onChange={handleVideo} type="text" defaultValue={state.content} />
            <iframe src={videoURL} type="text/html" width="500" height="265" allowFullScreen></iframe>
          </div>
        );
      }
      default: {
        return (
          <div>
            <label>Content</label>
            <input name="content" onChange={handleChange} type="text" defaultValue={state.content} />
          </div>
        );
      }
    }
  };

  return (
    <div className="flex-column white content-editor-container">
      <div>
        <label>Content Type</label>
        <select name="type" onChange={handleChange} defaultValue={state.type}>
          {ValidContentTypes.map((type) => {
            return <option key={type}>{type}</option>;
          })}
        </select>
      </div>
      <div>{getContentInput()}</div>
      <button onClick={trySave}>SAVE</button>
      <button onClick={cancelEdit}>CANCEL</button>
      {data.isInsert ? "" : <button onClick={deleteContent}>DELETE</button>}
    </div>
  );
};
export default ContentEditor;
