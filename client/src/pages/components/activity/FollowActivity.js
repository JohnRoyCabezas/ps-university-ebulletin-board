import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const FollowActivity = ({
  follower,
  following,
  created_at,
  user_id,
  user_avatar,
}) => {
  return (
    <div className="d-flex align-items-center w-100 border rounded p-3 my-2 bg-primary">
      <img
        src={`${process.env.REACT_APP_IMAGES_URL}/${
          follower.id === user_id ? user_avatar : follower.avatar
        }`}
        width="50"
        alt="user-profile"
        height="50"
        style={{ objectFit: "cover" }}
        className="rounded-circle me-3 border border-3 border-white"
      />
      <div>
        <span className="d-block small text-white">
          {follower.id === user_id ? (
            "You"
          ) : (
            <Link
              className="text-white text-decoration-none"
              replace
              to={`/profile/${follower.id}`}
            >
              {follower.name}
            </Link>
          )}
          {` followed `}
          {following.id === user_id ? (
            "you"
          ) : (
            <Link
              className="text-white text-decoration-none"
              replace
              to={`/profile/${following.id}`}
            >
              {following.name}
            </Link>
          )}
        </span>
        <span className="small text-white">{moment(created_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default FollowActivity;
