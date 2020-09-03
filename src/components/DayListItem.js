import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots == 0
  });

  const formatSpots = (spots) => {
    let string = "";
    if (spots == 0) return (string = "no spots remaining");
    if (spots == 1) return (string = "1 spot remaining");
    return (string = props.spots + " spots remaining");
  };

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}