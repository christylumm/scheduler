import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  const fragment = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />;
  // const fragment = <Empty />;

  return (<article className="appointment">
    <Header time={props.time} />
    {fragment}
  </article>);
}