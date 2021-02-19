import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  // console.log(pets);
  return (
    <div className="search">
      {pets.length === 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map(
          (pet) => (
            <Pet
              animal={pet.type}
              key={pet.id}
              name={pet.name}
              breed={pet.breeds.primary}
              media={pet.photos}
              location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
              id={pet.id}
            />
          )
          // <h1>See console</h1>
        )
      )}
    </div>
  );
};

export default Results;
