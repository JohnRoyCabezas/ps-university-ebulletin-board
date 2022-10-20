import React from 'react';
import Select from 'react-select';

const DropdownMulti = ({ label, handleMultiChange, data, type }) => {

  const onSelectChange = (value) => {
    handleMultiChange(value);
  };

  const dataOptions = data?.map((item) => {
    return {
      label: item[`${label}`],
      value: item['id'],
    };
  });

  return (
    <div>
      <Select
        isMulti
        placeholder={`Select ${type}...`}
        options={dataOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onSelectChange}
      />
    </div>
  );
};

export default DropdownMulti;
