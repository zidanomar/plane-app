import React, { useEffect, useState } from 'react';
import { Button, useColorMode } from '@chakra-ui/react';

import data from './users.json';

function Home() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const [users, setUsers] = useState([]);

  const inputHandler = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const registeredEmail = users.find((x) => x.email === userInput.email);

    if (registeredEmail) {
      console.log('email already used');
      setUserInput({
        email: '',
        password: '',
      });
    } else {
      setUsers((prevValue) => [...prevValue, userInput]);
      console.log(users);
    }
  };
  useEffect(() => {
    setUsers(data.users);
    console.log(data);
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          name='email'
          value={users.email}
          onChange={inputHandler}
        />
        <input
          type='password'
          name='password'
          value={users.password}
          onChange={inputHandler}
        />
        <button type='submit'>register</button>
      </form>
      {users.length > 0 ? (
        <ul>
          {users.map((u, i) => (
            <li key={i}>{u.email}</li>
          ))}
        </ul>
      ) : (
        <p>no user</p>
      )}
    </React.Fragment>
  );
}

export default Home;
