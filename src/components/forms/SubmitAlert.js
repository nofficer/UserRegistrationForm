import React from 'react'
import Alert from '@mui/material/Alert';
import {MdHighlightOff} from "react-icons/md";
import {BsCheckCircle} from "react-icons/bs"

const SubmitAlert = ({onClose, alertText, alertType, isMobile}) => {
  if(isMobile){
    return(
      <Alert icon={false} onClose={() => {onClose()}} className='mobileAlert'  severity={alertType}>
        <span className="Centerer"></span> <span className='Centered'> {alertType==='error' ? <MdHighlightOff size={20}/> : <BsCheckCircle size={20}/> }<strong>{alertText}</strong></span> <span className="Centerer"></span>
        </Alert>

    )
  }
  else{
    return(

      <Alert  icon={false} onClose={() => {onClose()}} className='Alert'  severity={alertType}>
        <span className="Centerer"></span> <span className='Centered'> {alertType==='error' ? <MdHighlightOff size={20}/> : <BsCheckCircle size={20}/> }<strong>{alertText}</strong></span> <span className="Centerer"></span>
        </Alert>

    )
  }

}

export default SubmitAlert
