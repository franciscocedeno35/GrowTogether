import "./PublicContentImage.css";

// need to find a way to get the image from the db THEN display that.
function PublicContentImage({ content }) {
  return (
    <div>
      <img src={content.imageSrc} alt="" />
      {/* <h2>{content}</h2> */}
    </div>
  );
}

export default PublicContentImage;
