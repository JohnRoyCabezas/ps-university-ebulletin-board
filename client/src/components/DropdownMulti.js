import React from 'react';
import Select from 'react-select';

const DropdownMulti = ({ label, selected, handleMultiChange, data, type }) => {

  const onSelectChange = (option) => {
    handleMultiChange(option);
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
        value={selected}
        placeholder={`Select ${type}...`}
        options={dataOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onSelectChange}
        openMenuOnClick={false}
      />
    </div>
  );
};

export default DropdownMulti;
