import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { MultipleSelectChip } from './MultipleSelectChip';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPanelSlotsByDate } from './slotsAPI';
import Calendar from '../common/Calendar';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BasicDateTimePicker from '../common/Calendar';

export const Panel = (props) => {
    const [startDate, setStartDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [panel, setPanel] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        loadPanel()
        
        },[])

    const loadPanel = async()=>{
        const dateObj = startDate;
        try {
          let response = await fetch(getPanelSlotsByDate(dateObj));
      
        response = {firstName:'Vinay',lastName:'Kumar', email:'a@gamil.com', mobile:'9876543210'}
        setPanel(response)
          if(!response) {
            throw new Error("Bad response")
          }
          return response;
        } catch (e) {
          return null;
        }
      }
      
      
      const getSlotsByDate = async()=>{
        const url = "/GetSlotsByDay";
        const params = {date:startDate}
        try {
          let response = await fetch(url, {
            method: "GET", // "POST", "PUT", "DELETE"
            params,
          });
          //response = response.json();
      
        response =[new Date(), new Date(),new Date(),new Date()]
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
    //    const results = await getSlotsByDate()
    //    setSlots(results)
      },[getSlotsByDate, setStartDate])
      
      const onClickSubmit = async()=>{
        alert("TO DO Submit")
      }
      
      const onClickSlot = (slot)=>{
        setSelectedSlot(slot)
      }
      
      const getFormattedTime = (dateTime)=>{
        const AMPM = dateTime.getHours() >= 12 ? " PM" : "AM";
        const formattedTime = ("0" + dateTime.getHours()).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2)+' '+AMPM;
        return formattedTime;
       }

// Check for loading flag 
// if (loading) return <p>Loading...</p>

return (
    <div className="mainContainer">
    <div className="container">
      <div className='title'>
       <div>{"R2 Panel - React"} </div> 
       <div>{"60 min"} </div> 
      </div>

      <div className='dateRow'>
      <span style={{width:"100%"}}>{"Select a Date"} </span> 
      <BasicDateTimePicker selectedDate ={startDate} onDateChange ={(date)=>onDateSelect(date)}></BasicDateTimePicker>
      </div>
      <span className=''>{"Choose slots"} </span> 
      <MultipleSelectChip />
      <div className='slotDetailsContaainer'>

<div className='panelContainer'>
<span>{"Panel Details"}</span>
<div className='panelDetailContainer'>
<div><input className='inputField' type='text' placeholder='First Name*' value={panel.firstName} defaultValue={'Mr.'}/></div>
<div><input className='inputField' type="text" placeholder='Last Name*' value={panel.lastName} defaultValue={'Y'}/></div>
<div><input className='inputField' type="email" placeholder='Email*' value={panel.email} defaultValue={'xyz@gmail.com'}/></div>
<div><input className='inputField' type='text' placeholder='Mobile*' value={panel.mobile} defaultValue={'91xxxxxxxx'}/></div>
</div>
</div>
<div><input className='submitButton' type='button' value='Submit' onClick={()=> onClickSubmit()} /></div>

      </div>
    </div>
  </div>
);
}