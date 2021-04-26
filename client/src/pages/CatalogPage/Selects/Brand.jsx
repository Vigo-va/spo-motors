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
  let defaultValue;
  if (props.currentBrand !== null) {
    defaultValue = {
      label: props.currentBrand.name,
      value: props.currentBrand.name,
      id: props.currentBrand.id,
    };
  } else {
    defaultValue = null;
  }
  return (
    <div className={'selects'}>
      <Select
        styles={customStyles}
        options={brandOptions}
        value={defaultValue}
        isDisabled={props.isLoading}
        onChange={props.onBrandsChange}
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
