import React from "react";
import { countLearnedWords } from "../../../utilities/countLearnedWords";

const WordsList = ({ finished_lessons }) => {
  const getCorrectWords = (words) => {
    return words.filter((word) => word.choice.is_correct);
  };
  return (
    <>
      {finished_lessons && finished_lessons.length ? (
        finished_lessons.map((lesson) => {
          return (
            <div key={lesson.id} className="alert alert-success" role="alert">
              <div className="row">
                <div className="d-flex mb-1">
                  <span className="fw-bold small d-block">
                    {lesson.lesson.title}
                  </span>
                  <span className="ms-auto small">
                    Score: {countLearnedWords(lesson)} /{" "}
                    {lesson.learned_words.length}
                  </span>
                </div>
                {getCorrectWords(lesson.learned_words).map((word) => {
                  return (
                    <span
                      key={word.id}
                      className="text-muted small d-block col-4"
                    >
                      <span className="fw-bold">{word.word_question.word}</span>{" "}
                      - {word.choice.choice}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">No learned words found.</div>
      )}
    </>
  );
};

export default WordsList;
