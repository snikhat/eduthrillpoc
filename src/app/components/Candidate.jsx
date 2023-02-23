import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './Candidate.css';
// import DatePicker from "react-datepicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import { getCandidateSlotsByDate } from './slotsAPI';
import BasicDateTimePicker from '../common/Calendar';
import dayjs from 'dayjs';

export const Candidate = (props) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(dayjs());
  const [candidate, setCandidate] = useState({});

  const navigate = useNavigate();

// Check for loading flag 
// if (loading) return <p>Loading...</p>

useEffect(()=>{
loadCandidate()

},[])

const loadCandidate = async()=>{
  const url = "/GetCandidate";
  const params = {date:startDate}
  try {
    let response = await fetch(url, {
      method: "GET", // "POST", "PUT", "DELETE"
      params,
    });
    //response = response.json();

  response = {firstName:'Vinay',lastName:'Kumar', email:'a@gamil.com', mobile:'9876543210'}
  setCandidate(response)
    if(!response) {
      throw new Error("Bad response")
    }
    return response;
  } catch (e) {
    return null;
  }
}


const getSlotsByDate = async()=>{
    // const params = {date:startDate}
  const dateObj = startDate;
  try {
    let response = await fetch(getCandidateSlotsByDate(dateObj));

  response =[dayjs("2023-02-23"), dayjs("2023-02-24"),dayjs("2023-02-25"),dayjs("2023-02-26")]
    if(!response) {
      throw new Error("Bad response")
    }
    return response;
  } catch (e) {
    return null;
  }
}

const onDateSelect  = useCallback(async(selectedDate)=>{
  setStartDate(selectedDate)
 const results = await getSlotsByDate()
 setSlots(results)
},[setSlots,getSlotsByDate, setStartDate])

const onClickSubmit = async()=>{
  alert("TO DO Submit")
}

const onClickSlot = (date)=>{
  setSelectedSlot(date)
}

const getFormattedTime = (dateTime)=>{
  const AMPM = dateTime.getHours() >= 12 ? " PM" : "AM";
  const formattedTime = ("0" + dateTime.hour()).slice(-2) + ":" + ("0" + dateTime.minut()).slice(-2)+' '+AMPM;
  return formattedTime;
 }


return (
  <div className="mainContainer">
    <div className="container">
      <div className='title'>
       <div>{"R1 interview - React"} </div> 
       <div>{"60 min"} </div> 
      </div>

      <div className='dateRow'>
      <span style={{marginRight: 15}}>{"Select a Date"} </span> 

          <BasicDateTimePicker selectedDate ={startDate} onDateChange ={(date)=>onDateSelect(date)}></BasicDateTimePicker>

      </div>
      <span className=''>{"Choose a slot"} </span> 
      <div className='slotRow'>
        { slots.length > 0 &&
        slots.map((item,index)=> <span className='slot'  style={{backgroundColor: item === selectedSlot? '#92b9e0':'#202224' }} onClick={()=>onClickSlot(item)}>{getFormattedTime(item)} </span> 
        )
        }
      </div>
      <div className='slotDetailsContaainer'>
<div className='selectedSlot'>
<span>{"Selected Slot Details"}</span>
<div className='slotLabel'>{"R1 interview - React"} </div> 
<div  className='slotLabel' >
  <span className='label'>{"60 min"}</span>
  <span className='label'>{startDate.toString()}</span>
  <span className='label'>{getFormattedTime(selectedSlot)}</span>
  </div>

</div>
<div className='candidateContainer'>
<span>{"Candidate Details"}</span>
<div className='cadidateDetailContainer'>
<div><input className='inputField' type='text' placeholder='First Name*' value={candidate.firstName} /></div>
<div><input className='inputField' type="text" placeholder='Last Name*' value={candidate.lastName} /></div>
<div><input className='inputField' type="email" placeholder='Email*' value={candidate.email} /></div>
<div><input className='inputField' type='text' placeholder='Mobile*' value={candidate.mobile} /></div>
</div>
</div>
<div><input className='submitButton' type='button' value='Submit' onClick={()=> onClickSubmit()} /></div>

      </div>
    </div>
  </div>
);

      }

