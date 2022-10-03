import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NavBar() {
  return (
    <ReactQuill
      theme="snow"
      className="block p-3 rounded-lg shadow-lg bg-white bottom-0"
    ></ReactQuill>
  );
}
