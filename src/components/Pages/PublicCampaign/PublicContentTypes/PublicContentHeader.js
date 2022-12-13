import "./PublicContentHeader.css";

function PublicContentHeader({ content }) {
  return <h1 className="white">{content.content}</h1>;
}

export default PublicContentHeader;
