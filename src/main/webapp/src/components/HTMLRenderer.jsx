import React from "react";
import DOMPurify from "dompurify";

const HTMLRenderer = ({ htmlString }) => {
  const createMarkup = () => {
    // Purify the HTML string before rendering it
    const sanitizedHtml = DOMPurify.sanitize(htmlString);
    return { __html: sanitizedHtml };
  };

  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export default HTMLRenderer;
