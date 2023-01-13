import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import React, { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useEffect, useState } from 'react';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();

  useEffect(() => {
    const fetchPlace = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        console.log(responseData, 'responseData>>>>>>>>>>>>>>>>>>>');
        setLoadedPlaces(responseData.place);
        setFormData({
          title: responseData.place.title,
          description: responseData.place.description,
        });
      } catch {}
    };
    fetchPlace();
  }, [placeId, sendRequest, setFormData]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    const editPlace = async () => {
      try {
         await sendRequest(
          `http://localhost:5000/api/places/${placeId}`,
          'PATCH',
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
          })
        );

        history.push(`/${auth.userId}/places`);
      } catch (err) {}
    };
    editPlace();
  };

  if (!loadedPlaces && !error) {
    return (
      <div className="center">
        <Card>
          <h2> Could Not finad a place</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={loadedPlaces.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={loadedPlaces.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </>
  );
};

export default UpdatePlace;
