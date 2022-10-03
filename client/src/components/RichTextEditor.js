import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <div>
      <ReactQuill theme="snow" className="block bottom-0"></ReactQuill>
      <div className="flex justify-between rte mb-2 p-2">
      <FontAwesomeIcon
          icon={faPaperclip}
          size="2x"
          color="#162750"
        />
        <FontAwesomeIcon
          icon={faArrowAltCircleRight}
          size="2x"
          color="#162750"
        />
      </div>
    </div>
  );
}
