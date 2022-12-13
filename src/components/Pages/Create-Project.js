import "./Create-Project.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GetImage, Post } from "../../scripts";

function CreateProject(props) {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [state, setState] = useState({
    title: "Default Title",
    subtitle: "Default SubTitle",
    description: "Default Description",
    goal: 1,
    duration: 1,
    mainImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    console.log(userID);
    if (!userID) {
      // then user is not logged in!!! they shouldn't ever be here!
      navigate("/Login");
    } else {
      GetImage(`638ae54cd4f54a8e23b56c4e`).then((image) => {
        setMainImage(image);
      });
    }
  }, []);

  const uploadImage = (e) => {
    // console.log(e.target.files);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    Post("/images", formData)
      .then((res) => {
        // we successfully posted to the server.
        setState({ ...state, mainImage: res });
        setMainImage(URL.createObjectURL(e.target.files[0]));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitNewCampaign = async (e) => {
    Post(`/unpublishedCampaigns/${userID}`, state)
      .then((response) => {
        console.log("Campaign successfully created! It returned:");
        console.log(response);
        // successfully created!
        navigate("/Campaign/Overview/" + response._id, { state: { campaign: response, userID: userID } });
      })
      .catch((error) => {
        console.log(error);
        switch (error.response.status) {
          case 428: {
            alert("You provided invalid information, please try again");
            break;
          }
          case 404: {
            // Image Not Found
            alert("We are having trouble finding your image, please try uploading it again");
            break;
          }
          default: {
            alert("There is an error with the server. Sorry");
            break;
          }
        }
      });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-column justify-center">
      <div className="flex-row justify-center ">
        <h1 className="create-campaign-h1">Create Your Own Campaign!</h1>
      </div>

      <div className="flex-row justify-center  ">
        <label className="create-campaign-label">Title:</label>
        <input className="create-campaign-input" type="text" value={state.title} name="title" onChange={handleChange} />
      </div>
      <div className="flex-row justify-center ">
        <label className="create-campaign-label">SubTitle:</label>
        <input className="create-campaign-input" type="text" value={state.subtitle} name="subtitle" onChange={handleChange} />
      </div>
      <div className="flex-row justify-center ">
        <label className="create-campaign-label">Description:</label>
        <textarea className="create-campaign-Description-textarea" value={state.description} name="description" onChange={handleChange} />
      </div>
      <div className="flex-row justify-center ">
        <div className="flex-column create-project-test">
          <label className="create-campaign-label">Main Image:</label>
          <input className="create-campaign-image-input " type="file" onChange={uploadImage} />
        </div>
        <img src={mainImage ? mainImage : ""} className="create-campaign-image-preview" />
      </div>
      <div className="flex-row justify-center ">
        <label className="create-campaign-label">Goal:</label>
        <input className="create-campaign-input" type="number" value={state.goal} name="goal" onChange={handleChange} />
      </div>
      <div className="flex-row justify-center ">
        <label className="create-campaign-label">Duration:</label>
        <input className="create-campaign-input" type="number" value={state.duration} name="duration" onChange={handleChange} />
      </div>

      <div className="flex-row justify-center create-campaign-create-button ">
        <button onClick={submitNewCampaign}> CREATE </button>
      </div>
    </div>
  );
}
export default CreateProject;
