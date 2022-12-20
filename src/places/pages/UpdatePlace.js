import React from "react";
import "./PlaceForm.css";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { DUMMY_PLACES } from "./UserPlaces";
import { useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
function UpdatePlace() {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  console.log(identifiedPlace, "identifiedPlace");

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2> Could Not find the place </h2>
      </div>
    );
  }
  return (
    <div className="place-form">
      <form>
        <Input
          id="title"
          element="input"
          type="text"
          placeholder="title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={() => {}}
          errorText="Please enter a valid title."
          value={identifiedPlace.title}
          valid={true}
        />
        <Input
          id="description"
          element="textarea"
          placeholder="description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={() => {}}
          errorText="Please enter a valid description."
          value={identifiedPlace.description}
          valid={true}
        />
        <Button type="submit" disabled={true}>
          {" "}
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdatePlace;
