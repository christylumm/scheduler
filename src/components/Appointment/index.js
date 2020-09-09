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
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview) 
    .then(response => {
      transition(SHOW);
    })
  }

  // DELETE AN APPOINTMENT ----------------------------------
  const deleting = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
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

    </article>
  );
}