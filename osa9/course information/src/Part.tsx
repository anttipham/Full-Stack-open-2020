import React from "react";
import { CoursePart } from "./types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled course ${JSON.stringify(value)}`);
};

const Part: React.FC<{ courseParts: CoursePart }> = ({ courseParts }) => {
  let returnObject;
  switch (courseParts.name) {
  case "Fundamentals":
  case "How to eat doritos 24/7":
    returnObject = (
      <div>
        Description {courseParts.description}
      </div>
    );
    break;
  case "Using props to pass data":
    returnObject = (
      <div>
        Projects per group {courseParts.groupProjectCount}
      </div>
    );
    break;
  case "Deeper type usage":
    returnObject = (
      <div>
        <div>Description {courseParts.description}</div>
        <div>
          Exercise Submission Link{" "}
          <a href={courseParts.exerciseSubmissionLink}>{courseParts.exerciseSubmissionLink}</a>
        </div>
      </div>
    );
    break;
  default:
    assertNever(courseParts);
    break;
  }

  return (
    <div style={{ marginLeft: "30px" }}>
      {returnObject}
    </div>
  );
};

export default Part;
