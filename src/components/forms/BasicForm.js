import React , {useState,useEffect} from 'react'
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormItem from './FormItem'
import Typography from '@mui/material/Typography';
const BasicForm = ({fields=[],validate,itemsPerRow,itemAlignment,itemVerticalPadding,itemHorizontalPadding,formValues,setFormValues,submitFunc}) => {
  const [errors,setErrors] = useState({})
  const handleSubmit = () => {
    submitFunc(errors)
  }


  const renderField = (field) => {
    let defaultVal = ''

    if(typeof(formValues[field.key]) !== 'undefined'){
      defaultVal = formValues[field.key]
    }

    return(
      <Grid key={field.key} style={{textAlign:itemAlignment,paddingTop:itemVerticalPadding,paddingRight:itemHorizontalPadding,paddingBottom:itemVerticalPadding,paddingLeft:itemHorizontalPadding}} item xs={12/itemsPerRow}>
      {field.otherLabel && <div className='formLabelStyle'>{field.otherLabel}</div>}
      <FormItem errors={errors} setErrors={setErrors} validate={validate} formValues={formValues} setFormValues={setFormValues} defaultVal={defaultVal} key={field.key} field={field} />
      </Grid>
    )



  }

  const renderForm = () => {
    return fields.map((field) => {
      return renderField(field)
    })
  }

  return (
    <>
    <Grid item xs={4.5}>
    </Grid>
    <Grid item xs={3}>
        <div className='formTitle'>
        Create User Account
        </div>
    </Grid>
    <Grid item xs={4.5}>
    </Grid>
    <Grid item xs={4.5}>
    </Grid>
    <Grid className='basicForm' item xs={3}>
      {renderForm()}
    </Grid>
    <Grid item xs={4.5}>
    </Grid>
    <Grid item xs={4.5}>
    </Grid>
    <Grid item xs={3}>
      <div className='actionButtonHolder'>
      <Grid container>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={10}>
          <button className='cancelButton' color="inherit" variant="outlined">Cancel</button>
          <button className='submitButton' onClick={handleSubmit} color="inherit" variant="outlined">Submit</button>
          </Grid>
          <Grid item xs={1}>
          </Grid>
      </Grid>
      </div>
    </Grid>
    <Grid item xs={4.5}>
    </Grid>


    </>
  )
}

export default BasicForm;
