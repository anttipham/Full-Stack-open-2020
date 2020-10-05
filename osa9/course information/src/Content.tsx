import React from "react";
import Part from "./Part";
import { CoursePart } from "./types";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const noMarginBottomStyle = {
    marginBottom: 0
  };
  return (
    <div>
      {courseParts.map((coursePart, i) => 
        <div key={i}>
          <p style={noMarginBottomStyle}>{coursePart.name} {coursePart.exerciseCount}</p>
          <Part courseParts={coursePart} />
        </div>
      )}
    </div>
  );
};

export default Content;
