import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
  const setDay = day => setState({ ...state, day});
  
  function updateSpots(count) {
    for (const day of state.days) {
      if (day.name === state.day) {
        day.spots += count;
      }
    }
  }
  
  useEffect(() => {
    const daysPromise = axios.get("http://localhost:8001/api/days");
    const appointmentsPromise = axios.get("http://localhost:8001/api/appointments");
    const interviewersPromise = axios.get("http://localhost:8001/api/interviewers");
    
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
        updateSpots(-1);
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
      .then((response) => {
        updateSpots(+1) 
        setState(prev => ({
          ...prev,
          days: response.data
        }));
      });
  };
  
  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };
}
