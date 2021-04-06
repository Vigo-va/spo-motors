import React from 'react';

import Select from 'react-select';

export const Brand = (props) => {
  const brandOptions = props.brands.map((brand) => ({
    label: brand.name,
    value: brand.name,
    id: brand._id,
  }));
  return <Select options={brandOptions} onChange={props.brandsOnChange} />;
};
