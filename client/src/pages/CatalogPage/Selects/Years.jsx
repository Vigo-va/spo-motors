import React from 'react';
import Select from 'react-select';

export const Years = (props) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#fff',
      borderColor: state.isFocused ? 'gray' : 'gray',
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        borderColor: state.isFocused ? 'black' : 'gray',
      },
    }),
  };

  const yearsOptions = props.years.map((year) => ({
    label: year,
    value: year,
  }));
  let defaultValue;
  if (props.currentYear !== null) {
    defaultValue = { label: props.currentYear, value: props.currentYear };
  } else {
    defaultValue = null;
  }
  return (
    <div className={'selects'}>
      <Select
        styles={customStyles}
        options={yearsOptions}
        value={defaultValue}
        isDisabled={props.isLoading}
        onChange={props.yearsOnChange}
        placeholder={'Выберите год'}
        theme={(theme) => ({
          ...theme,
          borderRadius: '5px',
          colors: {
            ...theme.colors,
            primary25: '#ebebeb',
            primary: '#717171',
          },
        })}
        noOptionsMessage={() => 'Выберите модель'}
      />
    </div>
  );
};
