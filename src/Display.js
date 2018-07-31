import React from "react";

export default function Display(props) {
  return (
    <div>
      <h1>User: {props.name ? props.name : ""}</h1>
      <p>{props.message ? props.message : ""}</p>
    </div>
  );
}
