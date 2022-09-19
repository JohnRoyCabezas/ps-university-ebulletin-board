import React from "react";
import moment from "moment";
import { countLearnedWords } from "../../../utilities/countLearnedWords";
import { Link } from "react-router-dom";

const LessonActivity = ({
  lesson,
  learned_words,
  user,
  user_id,
  created_at,
  user_avatar,
}) => {
  return (
    <div className="d-flex align-items-center w-100 border rounded p-3 my-2 bg-success">
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}/${
          user.id === user_id ? user_avatar : user.avatar
        }`}
        width="50"
        alt="user-profile"
        height="50"
        style={{ objectFit: "cover" }}
        className="rounded-circle me-3 border border-3 border-white"
      />
      <div>
        <span className="d-block small text-white">
          {user.id === user_id ? (
            "You"
          ) : (
            <Link
              className="text-white text-decoration-none"
              replace
              to={`/profile/${user.id}`}
            >
              {user.name}
            </Link>
          )}{" "}
          learned {countLearnedWords(lesson)} of {learned_words.length} words in{" "}
          {lesson.lesson.title}
        </span>
        <span className="small text-white">{moment(created_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default LessonActivity;
