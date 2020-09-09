import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

//VARIABLES TO SWITCH MODES ----------------------------------
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // SAVE AN APPOINTMENT -------------------------------------
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    
    props.bookInterview(props.id, interview) 
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  // DELETE AN APPOINTMENT ----------------------------------
  const deleting = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  // CONFIRM DELETE -----------------------------------------
  const confirm = () => {
    transition(CONFIRMING);
  }

  // EDIT APPOINTMENT ---------------------------------------
  const edit = () => {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty 
          onAdd={() => {
            return transition(CREATE);
          }} 
        />
      )}


      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirm()}
          onEdit={() => edit()}
        />
      )}

      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}

      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}

      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}

      {mode === CONFIRMING && (
        <Confirm
          onConfirm={() => deleting()}
          onCancel={back}
          message="Are you sure you want to delete?"
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Oops! There was an error in saving your appointment"
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Oops! There was an error in deleting your appointment"
          onClose={back}
        />
      )}

    </article>
  );
}