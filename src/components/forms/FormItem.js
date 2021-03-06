import React, {useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import DateOfBirthPicker from './DateOfBirthPicker'


const FormItem = ({field,defaultVal,formValues,setFormValues,validate,errors,setErrors,isMobile}) => {
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
  }

  if(field.type === 'input'){
    return (
        <TextField inputProps={ {"data-testid": field.key}} required={field.required} onBlur={changeField} fullWidth={field.fullWidth} variant={field.variant} error={errorStatus} helperText={errorText} value={itemValue} onChange={changeField}  key={field.key} type={field.inputType} label={field.label}/>
    )
  }

  else if(field.type === 'dob'){
    return (
      <DateOfBirthPicker
      isMobile={isMobile}
      required={field.required}
      errorStatus={errorStatus}
      helperText={errorText}
      labelId={field.key}
      id={field.key}
      value={itemValue}
      onChange={changeField}
      fullWidth={field.fullWidth}

       />
    )
  }
}

export default FormItem
