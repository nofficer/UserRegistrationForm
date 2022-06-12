import React from 'react'
import Grid from '@mui/material/Grid';
import SubmitAlert from './SubmitAlert'

import FormItem from './FormItem'

const BasicForm = ({fields=[],validate,itemsPerRow,formValues,setFormValues,submitFunc,errors,setErrors,isMobile,statusAlert,setStatusAlert}) => {

  const handleSubmit = () => {
    submitFunc()
  }

  const renderField = (field) => {
    let defaultVal = ''
    if(typeof(formValues[field.key]) !== 'undefined'){
      defaultVal = formValues[field.key]
    }
    return(
      <Grid key={field.key}  item xs={12/itemsPerRow}>
      {field.otherLabel && <div className='formLabelStyle'>{field.otherLabel}</div>}
      <FormItem isMobile={isMobile} errors={errors} setErrors={setErrors} validate={validate} formValues={formValues} setFormValues={setFormValues} defaultVal={defaultVal} key={field.key} field={field} />
      </Grid>
    )
  }

  const renderForm = () => {
    return fields.map((field) => {
      return renderField(field)
    })
  }

  if(isMobile){
    return (
      <>


      <Grid item xs={12}>
          <div className='mobileFormTitle'>
          Create User Account
          </div>
      </Grid>



      <Grid className='mobileBasicForm' item xs={12}>
        {renderForm()}
      </Grid>


      <Grid item xs={12}>
          {statusAlert.visible && <SubmitAlert isMobile={isMobile} onClose={() => setStatusAlert({})} alertType={statusAlert.alertType} alertText={statusAlert.alertText}/>}

      </Grid>

      <Grid item xs={12}>
        <div className='mobileActionButtonHolder'>
        <Grid container>





            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
            <button className='mobileCancelButton' color="inherit" variant="outlined">Cancel</button>

            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>

            <button className='mobileSubmitButton' onClick={handleSubmit} color="inherit" variant="outlined">Submit</button>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
        </div>
      </Grid>


      </>
    )
  }
  else{
    return (
      <>

      <Grid item xs={4}>
      </Grid>
      <Grid item xs={4}>
          <div className='formTitle'>
          Create User Account
          </div>
      </Grid>
      <Grid item xs={4}>
      </Grid>
      {statusAlert.visible && <SubmitAlert isMobile={isMobile} onClose={() => setStatusAlert({})} alertType={statusAlert.alertType} alertText={statusAlert.alertText}/>}

      <Grid item xs={4}>
      </Grid>
      <Grid className='basicForm' item xs={4}>
        {renderForm()}
      </Grid>
      <Grid item xs={4}>
      </Grid>


      <Grid item xs={4}>
      </Grid>
      <Grid item xs={4}>
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
      <Grid item xs={4}>
      </Grid>

      </>
    )
  }

}

export default BasicForm;
