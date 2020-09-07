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