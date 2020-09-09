import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
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
  
  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };
}
