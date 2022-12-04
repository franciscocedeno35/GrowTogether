import "./Create-Project.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Get, Post } from "../../scripts";
import { Buffer } from "buffer";

function CreateProject() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  const uploadImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleApi = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    Post("/images", formData)
      .then((res) => {
        Get(`/images/${res}`).then((response) => {
          console.log(response);
          setMainImage(
            "data:image/png;base64," +
              Buffer.from(response.data).toString("base64")
          );
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create-project">
      <h1>Upload Image</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={mainImage ? mainImage : ""} style={{ width: "300px" }} />
      )}
      <input type="file" onChange={uploadImage} />
      <button onClick={handleApi}> SUBMIT </button>
    </div>
  );
}
export default CreateProject;
