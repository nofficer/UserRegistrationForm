import React, { useState, useEffect, useMemo } from 'react'
import DropDown from './DropDown'
import moment from 'moment';

// Feeds a string representation of daymonthyear of birth to the onChange function

const DateOfBirthPicker = ({errorStatus, labelId, id, value, onChange, fullWidth}) => {
  const [selectedMonth, setSelectedMonth] = useState('placeholder')
  const [selectedYear, setSelectedYear] = useState('placeholder')
  const [selectedDay, setSelectedDay] =useState('placeholder')

  // Generate the Year and Month options. Also dynamically generate the day options based on which month and year are selected. Also memoize these so the functions don't run unnecessarily.
  const renderYearOptions = () => {
    let options = []
    for(let i = 1915; i<moment().year()-10;i++){
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
  const renderDayOptions = () => {
    let options = []
    if(selectedYear === 'placeholder' || selectedMonth === 'placeholder'){
      return options
    }
    let yearMonth = selectedYear.toString() + "-" + selectedMonth.toString()
    let daysInMonth = moment(yearMonth,"YYYY-MM").daysInMonth()
    for(let i = 1; i<daysInMonth+1;i++){
      options.push({optionValue:i, optionLabel:i})
    }
    return options
  }
  const dayOptions = useMemo(() => renderDayOptions(),[selectedYear,selectedMonth])

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
    <div style={{display:'flex'}}>
    
    <DropDown
    errorStatus={errorStatus}
    labelId={labelId.toString() + '-Years'}
    id={id.toString()+'-Years'}
    value={selectedYear}
    onChange={(e)=> handleYearChange(e.target.value)}
    fullWidth={fullWidth}
    options={yearOptions}
    placeholder={'Select a Year'}
     />
     <DropDown
     errorStatus={errorStatus}
     labelId={labelId.toString() + '-Months'}
     id={id.toString()+'-Months'}
     value={selectedMonth}
     onChange={(e)=> handleMonthChange(e.target.value)}
     fullWidth={fullWidth}
     options={monthOptions}
     placeholder={'Select a Month'}
      />
      <DropDown
      errorStatus={errorStatus}
      labelId={labelId.toString() + '-Days'}
      id={id.toString()+'-Days'}
      value={selectedDay}
      onChange={(e)=> handleDayChange(e.target.value)}
      fullWidth={fullWidth}
      options={dayOptions}
      placeholder={'Select a Day'}
       />
    </div>
  )
}

export default DateOfBirthPicker
