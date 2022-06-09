import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
import BasicForm from './BasicForm'
import Grid from '@mui/material/Grid';
import {validateEmail} from '../utility_functions/validateEmail'
import useWindowDimensions from '../../hooks/isMobile'
import createuserapi from '../../apis/createuser'
// Using label key will populate label on the item itself, using otherLabel will populate a label above the item

const fields = [
  {key:'full_name', label:'Full Name', type:'input', inputType:'text',variant:'outlined',fullWidth:true,required:true},
  {key:'contact_number', label:'Contact Number', type:'phone', inputType:'number',fullWidth:true,required:true},
  {key:'email',label:'Email', type:'input',fullWidth:true, required:true},
  {key:'day',label:'Day of Birth', type:'select',selectPlaceholder:'Day of Birth',fullWidth:true, required:true, options:[]},
  {key:'month',label:'Month of Birth', type:'select',selectPlaceholder:'Month of Birth',fullWidth:true, required:true, options:[]},
  {key:'year',label:'Year of Birth', type:'select',selectPlaceholder:'Year of Birth',fullWidth:true, required:true, options:[]},
  {key:'password',label:'Password', type:'input', inputType:'password',fullWidth:true,required:true},
  {key:'confirm_password',label:'Confirm Password', type:'input', inputType:'password',fullWidth:true,required:true},
]

const FormHolder = ({formTitle='Form Holder'}) => {

  // Instantiate formValues for each instance of the BasicForm component
  const [formValues, setFormValues] = useState({day:'placeholder',month:'placeholder', year:'placeholder'})
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

  let submitFunc = (errors) => {

    let errorArray = Object.keys(errors)
    let errorExists = false
    errorArray.forEach((error) => {
      if(errors[error] !== null){
        errorExists = true
      }
    })
    if(errorExists){
      console.log('Error cannot submit form')
    }
    else{

      console.log('Form Submitted')
    }

  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 style={{textAlign:'center'}}>{formTitle}</h1>
      </Grid>
    <Grid item xs={2}>

    </Grid>
    <Grid item xs={8}>
      <Grid container>
        <BasicForm submitFunc={submitFunc} formValues={formValues} setFormValues={setFormValues} itemVerticalPadding={4} itemHorizontalPadding={4} itemAlignment='center' itemsPerRow={1} fields={fields} validate={validateFunc}/>

      </Grid>
    </Grid>
    <Grid item xs={2}>

    </Grid>


    </Grid>
  )
}



export default FormHolder;
