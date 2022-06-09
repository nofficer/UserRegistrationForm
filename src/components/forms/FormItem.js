import React, {useState,useEffect} from 'react'
import DatePickerComp from './DatePickerComp'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const FormItem = ({field,defaultVal,formValues,setFormValues,validate,errors,setErrors}) => {
  const [itemValue, setItemValue] = useState(defaultVal)
  const [errorStatus,setErrorStatus] = useState(false)
  const [errorText,setErrorText] = useState('')

  useEffect(()=> {

    if(typeof(errors[field.key]) !== 'undefined'){

      if(errors[field.key] !== '' && errors[field.key] !== null){

        setErrorStatus(true)
        setErrorText(errors[field.key])
      }
      else {

        setErrorStatus(false)
        setErrorText(errors[field.key])
      }
    }


  },[errors,field.key])

  const changeField = (e) => {

    let key = field.key
    let obj = {}
    obj[key] = e.target.value
    setFormValues({...formValues,...obj})
    let newErrorObj = {}
    newErrorObj[field.key] = validate(e.target.value,field.key,field.required)
    setItemValue(e.target.value)

    setErrors({...errors,...newErrorObj})
    // if(newErrorObj[field.key] === null){
    //   let del_obj = errors
    //   delete del_obj[field.key]
    //   setErrors(del_obj)
    // }

  }


  if(field.type === 'input'){

    return (
        <TextField onBlur={changeField} fullWidth={field.fullWidth} variant={field.variant} error={errorStatus} helperText={errorText} value={itemValue} onChange={changeField}  key={field.key} type={field.inputType} label={field.label}/>
    )
  }
  else if(field.type === 'date'){
    return (
        <DatePickerComp fullWidth={field.fullWidth} error={errorStatus} helperText={errorText} setValue={changeField} value={itemValue} key={field.key} label={field.label}/>
    )
  }
  else if(field.type === 'select'){

    return(

        <Select
            error={errorStatus}
            labelId={field.key}
            id={field.key}
            value={itemValue}

            onChange={changeField}
            fullWidth={field.fullWidth}
          >
        <MenuItem disabled key="placeholder" value='placeholder'>{field.selectPlaceholder}</MenuItem>
          {field.options.map((option) => {
            return (
              <MenuItem key={option.optionValue} value={option.optionValue}>{option.optionLabel}</MenuItem>
            )
          })}
          </Select>

    )
  }
  else if(field.type === 'phone'){
    return (
      <>
      PHONE INPUT
      </>

    )
  }
}

export default FormItem
