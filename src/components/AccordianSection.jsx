import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AccordionSection = ({ title, content, type }) => {
  const formattedTitle = String(title).replace(/\s+/g, "-").toLowerCase();

  if (type === "Skeleton")
    return (
      <div className="accordion" id="accordionSkeleton">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <Skeleton height={40} />
          </h2>
        </div>
      </div>
    );
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${formattedTitle}`}
          aria-expanded="false"
          aria-controls={formattedTitle}
        >
          {title}
        </button>
      </h2>
      <div id={formattedTitle} className="accordion-collapse collapse">
        <div className="accordion-body">{content}</div>
      </div>
    </div>
  );
};

export default AccordionSection;
