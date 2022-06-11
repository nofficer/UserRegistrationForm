import React from 'react'
import Grid from '@mui/material/Grid';
import idealogo from './idealogo.png'
import {BsTelephone} from 'react-icons/bs'
import useWindowDimensions from '../../hooks/isMobile'

const Header = () => {
  const isMobile = useWindowDimensions()[1]
  if(isMobile){
    return (

      <Grid className='header'  alignItems='center' container>


      <Grid item xs={12}>
      <img alt='IdeaTheoremLogo' className='mobileLogoImage' src={idealogo}/>
      </Grid>



      </Grid>

    )
  }
  else {
    return (

      <Grid className='header'  alignItems='center' container>

      <Grid item xs={1}>
      </Grid>
      <Grid item xs={2}>
      <img alt='IdeaTheoremLogo' className='logoImage' src={idealogo}/>
      </Grid>
      <Grid item xs={6}>
      </Grid>
      <Grid className='telephoneIconHolder' item xs={2}>
        <div className='alignleft'>
          <BsTelephone className='telephoneIcon' size={14} /> <span className='headerPhoneNumberSpan'> 1 234 567-8910 </span>
        </div>
      </Grid>
      <Grid item xs={1}>
      </Grid>


      </Grid>

    )
  }

}

export default Header
