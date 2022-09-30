import React from 'react';
import Select from 'react-select';


const Dropdown = ({defaultLabel, handleChange, data, type}) => {
  const onSelectChange = (value) => {
    handleChange(type, value)
  }

  const dataOptions = data?.map((item) => {
    return {
      label: item[`${type}`],
      value: item['id']
    }
  });

  const defaultLabelString = String(defaultLabel);

  return (
    <div>
      {/* {defaultLabel} */}
      <Select 
        // defaultValue={{ label: defaultLabelString, value: 0}}
        onChange={onSelectChange} 
        options={dataOptions} />
    </div>
  );
};

export default Dropdown;
