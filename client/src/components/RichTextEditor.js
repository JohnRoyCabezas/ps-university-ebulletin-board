import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NavBar() {
  return (
    <ReactQuill
      theme="snow"
      className="block rounded shadow-lg bottom-0"
    ></ReactQuill>
  );
}