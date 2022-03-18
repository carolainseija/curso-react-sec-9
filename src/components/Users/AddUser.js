import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {

    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value
    console.log(nameInputRef.current.value)

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Entrada Invalida',
        message: 'Por favor ingrese una edad y un nombre válida (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Edad Invalida',
        message: 'Por favor ingrese una edad válida (> 0).',
      });
      return;
    }
    props.onAddUser(enteredName, enteredAge);
    /*Aca React no hace nada(el "value" esla api del dom normal) solo obtiene los datos,pero si estuvieramos usando estados serian controlados,
    porque ls datos los vamos manipulando setInName(actualizar) */
    /*Aca no estamos controlando el estado del elemento(del input en este caso) */
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };


  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          { /*Componentes no controlados */}
          {/*Los refs son componentes no controlados y por lo general todos los inputs son elementos no controlados */}
          {/*Con REFS Son componentes no controlados porque sus valores(estados) son internos(los datos los va a escribir
           el usuario por ejemplo y react solo lo recibe) y no los controla react */}
          {/*con STATE serian componentes controlados por los estados, los manipulariamos y actualizariamos nosotros */}
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
