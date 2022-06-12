import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DropDown = ({errorStatus,labelId,id,value,onChange,fullWidth,options,placeholder,required}) => {

  return(
    <Select
        error={errorStatus}
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        className='DropDownSelect'
        data-testid={id}
        inputProps={{ "data-testid": `content-input-${id}` }}
      >
    <MenuItem disabled key="placeholder" value='placeholder'>{placeholder} {required && <span className='requiredasterisk'>*</span>}</MenuItem>
      {options.map((option) => {
        return (
          <MenuItem key={option.optionValue} value={option.optionValue}>{option.optionLabel}</MenuItem>
        )
      })}
      </Select>
  )
}

export default DropDown
