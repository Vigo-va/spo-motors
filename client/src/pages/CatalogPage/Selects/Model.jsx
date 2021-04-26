import React from 'react';

import Select from 'react-select';

export const Model = (props) => {
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
  const modelOptions = props.models.map((model) => ({
    label: model.name,
    value: model.name,
    id: model._id,
  }));
  let defaultValue;
  if (props.currentModel !== null) {
    defaultValue = {
      label: props.currentModel.name,
      value: props.currentModel.name,
      id: props.currentModel.id,
    };
  } else {
    defaultValue = null;
  }

  return (
    <div className={'selects'}>
      <Select
        styles={customStyles}
        options={modelOptions}
        value={defaultValue}
        isDisabled={props.isLoading}
        onChange={props.onModelsChange}
        placeholder={'Выберите модель'}
        theme={(theme) => ({
          ...theme,
          borderRadius: '5px',
          colors: {
            ...theme.colors,
            primary25: '#ebebeb',
            primary: '#717171',
          },
        })}
        noOptionsMessage={() => 'Сначала выберите мартку'}
      />
    </div>
  );
};
