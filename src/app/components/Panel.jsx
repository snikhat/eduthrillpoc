import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MultipleSelectChip } from "./MultipleSelectChip";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPanelSlotsByDate } from "./slotsAPI";
import BasicDateTimePicker from "../common/Calendar";
import { mockPanelData } from "../json/mockPanel";
import dayjs from "dayjs";

export const Panel = (props) => {
  const [startDate, setStartDate] = useState(dayjs);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotListByDay, setSlotListByDay] = useState([]);
  const [selectedSlotList, setSelectedSlotList] = useState([]);
  const [panel, setPanel] = useState({});

  useEffect(() => {
    loadPanel();
  }, []);

  const loadPanel = async () => {
    const dateObj = startDate;
    try {
      let response = await getPanelSlotsByDate(dateObj);
      setPanel(response);
      if (!response) {
        throw new Error("Bad response");
      }
      return response;
    } catch (e) {
      setPanel(mockPanelData);
      return mockPanelData;
    }
  };

  const postSlotsByDate = async (dateList) => {
    const url = "/PostSlotsByDay";
    const params = { date: startDate };
    try {
      let response = await fetch(url, {
        method: "POST", // "GET", "PUT", "DELETE"
        body: JSON.stringify(dateList),
      });
      //response = response.json();

      response = [new Date(), new Date(), new Date(), new Date()];
      if (!response) {
        throw new Error("Bad response");
      }
      return response;
    } catch (e) {
      return null;
    }
  };

  const onDateSelect = useCallback(
    async (selectedDate) => {
      setStartDate(selectedDate);
    },
    [setStartDate]
  );

  const onClickSubmit = () => {
    const slotDateTimeList = selectedSlotList.map((item) => {
      const ampmTrim = item.split(" ");
      const ampm = ampmTrim[1];
      const trimArr = ampmTrim[0].split(":");

      const hour = parseInt(trimArr[0]);

      const clock_24 = hour === 12 ? 0 : ampm === "PM" ? 12 : 0;
      let dateCopy = new Date(startDate.toISOString());
      dateCopy.setMinutes(trimArr[1]);
      dateCopy.setHours(clock_24 + hour);
      console.log("@@@dateCopy", dateCopy);
      return dateCopy.toISOString();
    });

    console.log("@@@slotDateTimeList", slotDateTimeList);
    postSlotsByDate(slotDateTimeList);
  };

  const onClickSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const getFormattedTime = (dateTime) => {
    const AMPM = dateTime.getHours() >= 12 ? " PM" : "AM";
    const formattedTime =
      ("0" + dateTime.getHours()).slice(-2) +
      ":" +
      ("0" + dateTime.getMinutes()).slice(-2) +
      " " +
      AMPM;
    return formattedTime;
  };

  // Check for loading flag
  // if (loading) return <p>Loading...</p>

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="title">
          <div>{"R2 Panel - React"} </div>
          <div>{"60 min"} </div>
        </div>

        <div className="dateRow">
          <span style={{ marginRight: 15 }}>{"Select a Date"} </span>
          <BasicDateTimePicker
            selectedDate={startDate}
            onDateChange={(date) => onDateSelect(date)}
          ></BasicDateTimePicker>
        </div>
        <span className="">{"Choose slots"} </span>
        <MultipleSelectChip
          handleChange={(selectedList) => {
            setSelectedSlotList(selectedList);
          }}
        />
        <div className="slotDetailsContaainer">
          <div className="panelContainer">
            <span>{"Panel Details"}</span>
            <div className="panelDetailContainer">
              <div>
                <input
                  className="inputField"
                  type="text"
                  placeholder="First Name*"
                  value={panel.firstName}
                  defaultValue={"Mr."}
                />
              </div>
              <div>
                <input
                  className="inputField"
                  type="text"
                  placeholder="Last Name*"
                  value={panel.lastName}
                  defaultValue={"Y"}
                />
              </div>
              <div>
                <input
                  className="inputField"
                  type="email"
                  placeholder="Email*"
                  value={panel.email}
                  defaultValue={"xyz@gmail.com"}
                />
              </div>
              <div>
                <input
                  className="inputField"
                  type="text"
                  placeholder="Mobile*"
                  value={panel.mobile}
                  defaultValue={"91xxxxxxxx"}
                />
              </div>
            </div>
          </div>
          <div>
            <input
              className="submitButton"
              type="button"
              value="Submit"
              onClick={() => onClickSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
