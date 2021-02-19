import { Link } from "@reach/router";
import React from "react";

export default function Pet({ name, animal, breed, media, location, id }) {
  let hero = "http://placecorgi.com/300/300";
  if (media.lenght) {
    hero = media[0].small; //eslint-disable-line
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={media[0].small} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{animal + "-" + breed + "-" + location}</h2>
      </div>
    </Link>
  );
}
