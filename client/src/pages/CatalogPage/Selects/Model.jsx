import React from 'react';

import Select from 'react-select';

export const Model = (props) => {
  const modelOptions = props.models.map((model) => ({
    label: model.name,
    value: model.name,
    id: model._id,
  }));
  return <Select options={modelOptions} onChange={props.modelsOnChange} />;
};
