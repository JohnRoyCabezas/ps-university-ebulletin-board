import React from "react";
import { Navigate, useParams } from "react-router-dom";
import LessonsWordsPage from "../../LessonsWordsPage";

const MatchLearningsRoute = () => {
  const { type } = useParams();
  if (type === "lessons" || type === "words") {
    return <LessonsWordsPage />;
  }
  return <Navigate to={"*"} replace />;
};

export default MatchLearningsRoute;
