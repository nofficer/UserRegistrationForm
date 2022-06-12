import React, { useState, useMemo, useEffect } from 'react'
import DropDown from './DropDown'
import moment from 'moment';
import FormHelperText from '@mui/material/FormHelperText';

// Feeds a string representation of daymonthyear of birth to the onChange function

const DateOfBirthPicker = ({errorStatus, labelId, id, value, onChange, fullWidth, helperText, required, isMobile}) => {
  const [selectedMonth, setSelectedMonth] = useState('placeholder')
  const [selectedYear, setSelectedYear] = useState('placeholder')
  const [selectedDay, setSelectedDay] = useState('placeholder')
  const [dayOptions, setDayOptions] = useState([])

  useEffect(() => {
    let newDayOptions = renderDayOptions()
    setDayOptions(newDayOptions)
  },[selectedYear,selectedMonth])

  // Generate the Year and Month options. Also dynamically generate the day options based on which month and year are selected. Also memoize these so the functions don't run unnecessarily.
  const renderYearOptions = () => {
    let options = []
    for(let i = 1915; i<moment().year();i++){
      options.push({optionValue:i, optionLabel:i})
    }
    options.reverse()
    return options
  }
  const yearOptions = useMemo(() => renderYearOptions(),[])
  const monthOptions = [
    {optionValue:1, optionLabel:'January'},
    {optionValue:2, optionLabel:'February'},
    {optionValue:3, optionLabel:'March'},
    {optionValue:4, optionLabel:'April'},
    {optionValue:5, optionLabel:'May'},
    {optionValue:6, optionLabel:'June'},
    {optionValue:7, optionLabel:'July'},
    {optionValue:8, optionLabel:'August'},
    {optionValue:9, optionLabel:'September'},
    {optionValue:10, optionLabel:'October'},
    {optionValue:11, optionLabel:'November'},
    {optionValue:12, optionLabel:'December'}
  ]
  const handleChange = (dayval,monthval,yearval) => {
    if(yearval !== 'placeholder' && monthval !== 'placeholder' && dayval !== 'placeholder'){
      let day = dayval>9 ? dayval.toString() : "0"+dayval.toString()
      let month = monthval>9 ? monthval.toString() : "0"+monthval.toString()
      let year = yearval.toString()
      let dayMonthYear = day + month + year
      let result = {target: {
        value: dayMonthYear
      }}
      onChange(result)
    }

  }

  const renderDayOptions = () => {
    let options = []
    if(selectedYear === 'placeholder' || selectedMonth === 'placeholder'){
      let daysInMonth = 31
      for(let i = 1; i<daysInMonth+1;i++){
        options.push({optionValue:i, optionLabel:i})
      }
      return options
    }
    let yearMonth = selectedYear.toString() + "-" + selectedMonth.toString()
    let daysInMonth = moment(yearMonth,"YYYY-MM").daysInMonth()
    for(let i = 1; i<daysInMonth+1;i++){
      options.push({optionValue:i, optionLabel:i})
    }
    // Will autoselect the last day of the month if user selected a day that doesn't exist in the month the user just changed it to
    if(selectedDay>daysInMonth){
      setSelectedDay(daysInMonth)
      // Cannot alter the parent state while rendering the child component
      handleChange(daysInMonth,selectedMonth,selectedYear)
    }
    return options
  }




  const handleDayChange = (val) => {
    setSelectedDay(val)
    handleChange(val,selectedMonth,selectedYear)
  }

  const handleMonthChange = (val) => {
    setSelectedMonth(val)
    handleChange(selectedDay,val,selectedYear)
  }

  const handleYearChange = (val) => {
    setSelectedYear(val)
    handleChange(selectedDay,selectedMonth,val)
  }


  return (
    <>
    <div className={isMobile ? 'mobileDateOfBirthPicker' :'DateOfBirthPicker'}>

     <DropDown
     required={required}
     errorStatus={errorStatus}
     labelId={labelId.toString() + '-Days'}
     id={id.toString()+'-Days'}
     value={selectedDay}
     onChange={(e)=> handleDayChange(e.target.value)}
     fullWidth={fullWidth}
     options={dayOptions}
     placeholder={'Day'}

      />
     <DropDown
     required={required}
     errorStatus={errorStatus}
     labelId={labelId.toString() + '-Months'}
     id={id.toString()+'-Months'}
     value={selectedMonth}
     onChange={(e)=> handleMonthChange(e.target.value)}
     fullWidth={fullWidth}
     options={monthOptions}
     placeholder={'Month'}
      />

    <DropDown
    required={required}
    errorStatus={errorStatus}
    labelId={labelId.toString() + '-Years'}
    id={id.toString()+'-Years'}
    value={selectedYear}
    onChange={(e)=> handleYearChange(e.target.value)}
    fullWidth={fullWidth}
    options={yearOptions}
    placeholder={'Year'}
           />

    </div>
    <FormHelperText className='dobpickerhelpertext'>{helperText}</FormHelperText>
    </>
  )
}

export default DateOfBirthPicker
