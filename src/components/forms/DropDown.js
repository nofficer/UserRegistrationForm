import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DropDown = ({errorStatus,labelId,id,value,onChange,fullWidth,options,placeholder}) => {
  return(
    <Select
        error={errorStatus}
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        sx={{width:'100%'}}
      >
    <MenuItem disabled key="placeholder" value='placeholder'>{placeholder}</MenuItem>
      {options.map((option) => {
        return (
          <MenuItem key={option.optionValue} value={option.optionValue}>{option.optionLabel}</MenuItem>
        )
      })}
      </Select>
  )
}

export default DropDown
