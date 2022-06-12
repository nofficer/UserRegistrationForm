import React , {useState} from 'react'
import BasicForm from './BasicForm'
import Grid from '@mui/material/Grid';
import {validateEmail} from '../utility_functions/validateEmail'
import useWindowDimensions from '../../hooks/isMobile'
import createuserapi from '../../apis/createuser'
import '../../index.css'
// Using label key will populate label on the item itself, using otherLabel will populate a label above the item

const fields = [
  {key:'full_name', label:'Full Name', type:'input', inputType:'text',variant:'outlined',fullWidth:true,required:true, otherLabel:'Full Name'},
  {key:'contact_number', label:'Contact Number', type:'input', inputType:'number',fullWidth:true,required:true, otherLabel:'Contact Number'},
  {key:'date_of_birth',label:'Date of Birth', type:'dob',fullWidth:true, required:true, otherLabel:'BirthDate'},
  {key:'email',label:'Email Address', type:'input',fullWidth:true, required:true, otherLabel:'Email Address'},
  {key:'password',label:'Password', type:'input', inputType:'password',fullWidth:true,required:true, otherLabel:'Password'},
  {key:'confirm_password',label:'Confirm Password', type:'input', inputType:'password',fullWidth:true,required:true, otherLabel:'Confirm Password'},
]

const FormHolder = ({formTitle='Form Holder'}) => {

  // Instantiate formValues for each instance of the BasicForm component
  const [formValues, setFormValues] = useState({})
  const [errors,setErrors] = useState({})
  const isMobile = useWindowDimensions()[1]
  const [statusAlert,setStatusAlert] = useState({visible:false})

// To implement validate function it takes three arguments (itemValue,key,required)
// If validate function returns null then no errors will be rendered
// If validate function returns a string then an error will be rendered for the form item corresponding to the key
  let validateFunc = (itemValue,key,required) => {
    // eslint-disable-next-line
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if( (itemValue === '' && required===true) || (typeof(itemValue) === 'undefined' && required===true) ){
      return 'Required'
    }
    if(key==='full_name'){

      if(format.test(itemValue)){
        return 'Special Characters are not allowed.'
      }
      if(itemValue.trim() !== itemValue){
        return "Please remove all leading or trailing whitespaces."
      }

    }
    if(key==='contact_number'){
      if(itemValue.length>15){
        return "Phone numbers should not exceed 15 digits."
      }
    }
    if(key==='password'){
      if(itemValue.length<8){
        return "Password must be longer than 8 characters."
      }
      if(format.test(itemValue)){
        return 'Special Characters are not allowed.'
      }
    }
    if(key==='confirm_password' && itemValue !== formValues.password){
        return "Passwords must match!"
    }
    if(key==='email' && !validateEmail(itemValue)){
      return "Sorry, this email address is not valid. Please try again."
    }

      return null
  }

  const handleApiSubmit = async () => {
    try{
      let res = await createuserapi.post('/', formValues)
      setStatusAlert({visible:true, alertType:'success', alertText: `  ${res.data.title}:   ${res.data.description}`})
      return res
    }
    catch(err){
      setStatusAlert({visible:true, alertType:'error', alertText: `  ${err.response.data.title}:   ${err.response.data.description}`})
      return err
    }

  }

  let submitFunc = () => {
    let newErrorObj = {}
    fields.forEach((field) => {
      newErrorObj[field.key] = validateFunc(formValues[field.key],field.key,field.required)

    })
    setErrors({...errors,...newErrorObj})
    let errorArray = Object.keys(newErrorObj)
    let errorExists = false
    errorArray.forEach((error) => {
      if(errors[error] !== null){
        errorExists = true
      }
    })
    if(errorExists){
      setStatusAlert({visible:true, alertType:'error', alertText: 'Please correct outstanding errors before submitting.' })
    }
    else{
      handleApiSubmit()
    }

  }

  return (

    <div className='formContainer'>
      <Grid container>
          <BasicForm setStatusAlert={setStatusAlert} statusAlert={statusAlert} isMobile={isMobile} errors={errors} setErrors={setErrors} submitFunc={submitFunc} formValues={formValues} setFormValues={setFormValues} itemVerticalPadding={4} itemHorizontalPadding={4} itemAlignment='center' itemsPerRow={1} fields={fields} validate={validateFunc}/>

      </Grid>
    </div>
  )
}



export default FormHolder;
