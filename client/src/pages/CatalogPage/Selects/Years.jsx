import React from 'react';
import Select from 'react-select';

export const Years = (props) => {
  const yearsOptions = props.years.map((year) => ({
    label: year,
    value: year,
  }));
  return (
    <Select
      options={yearsOptions}
      defaultInputValue={props.currentYear}
      onChange={props.yearsOnChange}
    />
  );
};
