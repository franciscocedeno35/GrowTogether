import "./PublicContent.css";
import PublicContentHeader from "./PublicContentTypes/PublicContentHeader";
import PublicContentParagraph from "./PublicContentTypes/PublicContentParagraph";
import PublicContentImage from "./PublicContentTypes/PublicContentImage";
import PublicContentVideo from "./PublicContentTypes/PublicContentVideo";

function PublicContent({ content }) {
  switch (content.type) {
    case "Header": {
      return (
        <div>
          <PublicContentHeader content={content} />
        </div>
      );
    }
    case "Paragraph": {
      return (
        <div className="public-content-paragraph">
          <PublicContentParagraph content={content} />
        </div>
      );
    }
    case "Image": {
      return (
        <div>
          <PublicContentImage content={content} />
        </div>
      );
    }
    case "Video": {
      return (
        <div>
          <PublicContentVideo content={content} />
        </div>
      );
    }
    default: {
      return (
        <div>
          <PublicContentHeader content={content} />
        </div>
      );
    }
  }
}

export default PublicContent;
