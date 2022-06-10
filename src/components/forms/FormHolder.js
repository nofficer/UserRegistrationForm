import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
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
  {key:'email',label:'Email', type:'input',fullWidth:true, required:true, otherLabel:'Email'},
  {key:'date_of_birth',label:'Date of Birth', type:'dob',fullWidth:true, required:true, otherLabel:'Date of Birth'},
  {key:'password',label:'Password', type:'input', inputType:'password',fullWidth:true,required:true, otherLabel:'Password'},
  {key:'confirm_password',label:'Confirm Password', type:'input', inputType:'password',fullWidth:true,required:true, otherLabel:'Confirm Password'},
]

const FormHolder = ({formTitle='Form Holder'}) => {

  // Instantiate formValues for each instance of the BasicForm component
  const [formValues, setFormValues] = useState({contact_number:""})
  const [windowDimensions,isMobile] = useWindowDimensions()

// To implement validate function it takes three arguments (itemValue,key,required)
// If validate function returns null then no errors will be rendered
// If validate function returns a string then an error will be rendered for the form item corresponding to the key
  let validateFunc = (itemValue,key,required) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(itemValue === '' && required===true){
      return 'Required'
    }
    if(key==='full_name'){

      if(format.test(itemValue)){
        return 'Special Characters are not allowed'
      }
      if(itemValue.trim() !== itemValue){
        return "Please remove all leading or trailing whitespaces"
      }

    }
    if(key==='contact_number'){
      // NEED TO IMPLEMENT THIS
    }
    if(key==='password'){
      if(itemValue.length<8){
        return "Password must be longer than 8 characters"
      }
      if(format.test(itemValue)){
        return 'Special Characters are not allowed'
      }
    }
    if(key==='confirm_password' && itemValue !== formValues.password){
        return "Passwords must match!"
    }
    if(key==='email' && !validateEmail(itemValue)){
      return "Must be valid email address"
    }


      return null
  }

  const handleApiSubmit = async () => {
    try{
      let res = await createuserapi.post('/', formValues)
      console.log(res)
      alert(`${res.data.title}: \ ${res.data.description}`)
      return res
    }
    catch(err){
      console.log(err.response.data)
      alert(`${err.response.data.title}: \ ${err.response.data.description}`)
      return err
    }

  }

  let submitFunc = (errors) => {
    let errorArray = Object.keys(errors)
    let errorExists = false
    errorArray.forEach((error) => {
      if(errors[error] !== null){
        errorExists = true
      }
    })
    if(errorExists){
      alert('Please correct outstanding errors before submitting form.')
      console.log('Error cannot submit form')
    }
    else{
      let res = handleApiSubmit()
      console.log('Form Submitted')
    }

  }

  return (
    <div className='formFlexBox'>
      <div className='formContainer'>
          <BasicForm submitFunc={submitFunc} formValues={formValues} setFormValues={setFormValues} itemVerticalPadding={4} itemHorizontalPadding={4} itemAlignment='center' itemsPerRow={1} fields={fields} validate={validateFunc}/>
      </div>
    </div>
  )
}



export default FormHolder;
