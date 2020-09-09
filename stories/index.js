import React, { Fragment } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem.js";
import DayList from "components/DayList.js";
import InterviewerListItem from "components/InterviewerListItem.js";
import InterviewerList from "components/InterviewerList.js";

//APPOINTMENT COMPONENTS -----------------------
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";


// BUTTON MODULE -------------------------------

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

// DAYLIS TITEM MODULE -------------------------------
storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    // Provides the default background color for our component
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  // To define our stories, we call add() once for each of our test states to generate a story 
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) 
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    // action() allows us to create a callback that appears in the actions panel when clicked
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> 
  ));

// DAYS ARRAY -------------------------------

const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
// DAY LIST MODULE -------------------------------
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

// INTERVIEWER LIST ITEM MODULE ------------------------
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));

// INTERVIEWER LIST MODULE ------------------------
  const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];
  
  storiesOf("InterviewerList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Initial", () => (
      <InterviewerList
        interviewers={interviewers}
        setInterviewer={action("setInterviewer")}
        onChange={action("onChange")}
      />
    ))
    .add("Preselected", () => (
      <InterviewerList
        interviewers={interviewers}
        interviewer={3}
        setInterviewer={action("setInterviewer")(interviewer.id)}
        onChange={action("onChange")}
      />
    ));

// APPOINTMENT MODULE ------------------------
  storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => <Show student="Lydia Miller-Jones" interviewer={interviewer} onDelete={action("onDelete")} onEdit={action("onEdit")} />)
  .add("Confirm", () => <Confirm message="Delete the appointment?" onConfirm={action("onConfirm")} onCancel={action("onCancel")} />)
  .add("Status", () => <Status message="Deleting" />)
  .add("Error", () => <Error message="Could not delete appointment." onClose={action("onClose")} />)
  .add("Create", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Edit", () => <Form name="Millie" interviewers={interviewers} interviewer={3} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ));