export function getAppointmentsForDay(state, day) {
  const finalArr = [];
  for(const sameDay of state.days) {
    if (day === sameDay.name) {
      for (let appointment of sameDay.appointments) {
        for (const[key, value] of Object.entries(state.appointments)) {
          if (appointment === value.id) {
            finalArr.push(value)
          }
        }
      }
    }
  }
  return finalArr;
}

export function getInterview(state, interview) {
  if(!interview) return null;

  const myInterview = {
    student:interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return myInterview;
}