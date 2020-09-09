import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";

import { 
  getAppointmentsForDay,
  getInterview, 
  getInterviewersForDay 
} from "../helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const daysPromise = axios.get("http://localhost:8001/api/days");
  const appointmentsPromise = axios.get("http://localhost:8001/api/appointments");
  const interviewersPromise = axios.get("http://localhost:8001/api/interviewers");

  const setDay = day => setState({ ...state, day});
  
  useEffect(() => {
    Promise.all([
      daysPromise,
      appointmentsPromise,
      interviewersPromise
    ])
    .then((all) => {
      let [days, appointments, interviewers] = all;
      days = days.data;
      appointments = appointments.data;
      interviewers = interviewers.data;

      console.log("from use effect", days, appointments, interviewers);

      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios 
      .put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then((response) => {
        setState({
          ...state,
          appointments
        });
      });
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => axios.get("http://localhost:8001/api/days"))
      .then((response) => 
        setState(prev => ({
          ...prev,
          days: response.data
        })));
  }; 


  
  const appointmentsArr = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointmentsArr.map((appointment) => {
    const interview = getInterview(state, appointment.interview);   
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};