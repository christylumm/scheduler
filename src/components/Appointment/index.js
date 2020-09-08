import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

//VARIABLES TO SWITCH MODES ----------------------------------
const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const fragment = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />;
  // const fragment = <Empty />;

  return (
    <article className="appointment">
      <Header time={props.time} />
      {fragment}
    </article>
  );
}