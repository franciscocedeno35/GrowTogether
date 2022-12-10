import "./PublicContentVideo.css";

function PublicContentVideo({ content }) {
  return (
    <div>
      {/* <h3>{content}</h3> */}
      <iframe src={content.videoURL} type="text/html" width="500" height="265" allowFullScreen></iframe>
    </div>
  );
}

export default PublicContentVideo;
