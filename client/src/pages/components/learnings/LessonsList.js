import React from "react";
import { countLearnedWords } from "../../../utilities/countLearnedWords";

const LessonsList = ({ finished_lessons }) => {
  return (
    <>
      {finished_lessons && finished_lessons.length ? (
        finished_lessons.map((lesson) => {
          return (
            <div key={lesson.id} className="alert alert-success" role="alert">
              <div className="d-flex">
                <span className="fw-bold small d-block">
                  {lesson.lesson.title}
                </span>
                <span className="ms-auto small">
                  Score: {countLearnedWords(lesson)} /{" "}
                  {lesson.learned_words.length}
                </span>
              </div>
              <span className="text-muted small d-block">
                {lesson.lesson.description}
              </span>
            </div>
          );
        })
      ) : (
        <div className="text-center">No finished lessons found.</div>
      )}
    </>
  );
};

export default LessonsList;
