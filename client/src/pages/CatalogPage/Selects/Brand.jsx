import React from 'react';

import Select from 'react-select';

export const Brand = (props) => {
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
  const brandOptions = props.brands.map((brand) => ({
    label: brand.name,
    value: brand.name,
    id: brand._id,
  }));
  return (
    <div className={'selects'}>
      <Select
        styles={customStyles}
        options={brandOptions}
        isDisabled={props.isLoading}
        onChange={props.brandsOnChange}
        placeholder={'Выберите марку'}
        theme={(theme) => ({
          ...theme,
          borderRadius: '5px',
          colors: {
            ...theme.colors,
            primary25: '#ebebeb',
            primary: '#717171',
          },
        })}
        noOptionsMessage={() => 'Нет данных!'}
      />
    </div>
  );
};
