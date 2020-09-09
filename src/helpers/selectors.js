export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => { 
    return singleDay.name === day
    })

  if (filteredDays.length === 0) {
    return [];
  }
  const appointmentsMapped = filteredDays[0].appointments.map((app) => {
    return state.appointments[app]
  })

  return appointmentsMapped;
}

export function getInterview(state, interview) {
  if(!interview) return null;

  const myInterview = {
    student:interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return myInterview;
}

export function getInterviewersForDay (state, day) {
  const filteredDays = state.days.filter((selectedDay) => {
    return selectedDay.name === day
  })

  if (filteredDays.length === 0) {
    return [];
  }

  const interviewersMapped = filteredDays[0].interviewers.map((int) => {
    return state.interviewers[int]
  })

  return interviewersMapped;
}