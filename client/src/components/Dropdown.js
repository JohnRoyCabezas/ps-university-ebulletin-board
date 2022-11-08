import React from 'react';
import Select from 'react-select';

const Dropdown = ({
  selectedLabel,
  selectedValue,
  label,
  handleChange,
  data,
  type,
}) => {
  
  const onSelectChange = (value) => {
    handleChange(type, value);
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
        value={
          selectedValue && {
            label: `${selectedLabel ? selectedLabel : null}`,
            value: `${selectedValue ? selectedValue : null}`,
          }
        }
        placeholder={`Select a ${type}...`}
        onChange={onSelectChange}
        options={dataOptions}
      />
    </div>
  );
};

export default Dropdown;
