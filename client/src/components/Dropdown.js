import React from 'react';
import Select from 'react-select';

const Dropdown = ({ defaultLabel, defaultValue, handleChange, data, type }) => {
  const onSelectChange = (value) => {
    handleChange(type, value);
  };

  const dataOptions = data?.map((item) => {
    return {
      label: item[`${type}`],
      value: item['id'],
    };
  });
  

  return (
    <div>
      <Select
        value={{
          label: `${defaultLabel ? defaultLabel : 'Select a value'}`,
          value: `${defaultValue ? defaultValue : 'Select a value'}`,
        }}
        onChange={onSelectChange}
        options={dataOptions}
      />
    </div>
  );
};

export default Dropdown;
