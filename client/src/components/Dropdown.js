import React from "react";

import Select from "react-select";

const Countries = [
  { label: "Albania", value: 355 },
  { label: "Argentina", value: 54 },
  { label: "Austria", value: 43 },
  { label: "Cocos Islands", value: 61 },
  { label: "Kuwait", value: 965 },
  { label: "Sweden", value: 46 },
  { label: "Venezuela", value: 58 },
];

class SelectDropDownComponent extends React.Component {
  render() {
    return (
      <div>
        <Select options={Countries} />
      </div>
    );
  }
}

export default SelectDropDownComponent;
