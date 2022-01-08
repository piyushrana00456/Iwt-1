import React from "react";

export const EventCard = ({ ele }) => {
  return (
    <div className="card">
      <p>Event: {ele.title}</p>
      <p>Date: {ele.date}</p>
    </div>
  );
};
// date,notes,title
