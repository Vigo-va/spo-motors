import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

function LoginForm(props) {
  return (
    <Form>
      <Form.Group controlId="userEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          name={'username'}
          value={props.username}
          onChange={props.changeHandler}
        />
      </Form.Group>

      <Form.Group controlId="userPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          name={'password'}
          value={props.password}
          onChange={props.changeHandler}
        />
      </Form.Group>
      <Button
        className={'loginButton'}
        onClick={props.loginHandler}
        disabled={props.isLoading}
        block
      >
        {props.isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          ''
        )}
        Login
      </Button>
      {/*<Button*/}
      {/*  variant={'link'}*/}
      {/*  value={'Register'}*/}
      {/*  className={'registerButton'}*/}
      {/*  onClick={props.authToggleHandler}*/}
      {/*  block*/}
      {/*>*/}
      {/*  Doesn't have an account? Register*/}
      {/*</Button>*/}
    </Form>
  );
}
// function RegisterForm(props) {
//   return (
//     <Form>
//       <Form.Group controlId="userEmail">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter Username"
//           name={'username'}
//           value={props.username}
//           onChange={props.changeHandler}
//         />
//       </Form.Group>
//
//       <Form.Group controlId="userPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Enter Password"
//           name={'password'}
//           value={props.password}
//           onChange={props.changeHandler}
//         />
//       </Form.Group>
//       <Button className={'loginButton'} onClick={props.registerHandler} block>
//         Register
//       </Button>
//       <Button
//         variant={'link'}
//         className={'registerButton'}
//         onClick={props.authToggleHandler}
//         disabled={props.loading}
//         block
//       >
//         have an account? Login
//       </Button>
//     </Form>
//   );
// }

export const AdminAuth = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [authToggle, setAuthToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const registerHandler = async () => {
  //   try {
  //     const data = await axios.post('/api/admin/register', { ...form });
  //     console.log('Data', data);
  //   } catch (e) {}
  // };
  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const data = await axios.post('/api/admin/login', { ...form });
      auth.login(data.data.token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  // const clearForm = () => {
  //   setForm({
  //     ...form,
  //     username: '',
  //     password: '',
  //   });
  // };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // const authToggleHandler = () => {
  //   setAuthToggle((prev) => !prev);
  //   clearForm();
  // };

  let authForm;
  if (authToggle) {
    authForm = (
      <LoginForm
        email={form.email}
        password={form.password}
        changeHandler={changeHandler}
        // authToggleHandler={authToggleHandler}
        loginHandler={loginHandler}
        isLoading={isLoading}
      />
    );
    // } else {
    // authForm = (
    //   <RegisterForm
    //     email={form.email}
    //     password={form.password}
    //     changeHandler={changeHandler}
    //     authToggleHandler={authToggleHandler}
    //     registerHandler={registerHandler}
    //   />
    // );
  }
  return (
    <Row>
      <Col />
      <Col md={5}>
        <Card bg={'light'} className={'loginForm'}>
          <Card.Header className={'loginFormTitle'}>
            {authToggle ? 'LOGIN' : 'REGISTER'}
          </Card.Header>
          <Card.Body>{authForm}</Card.Body>
        </Card>
      </Col>
      <Col />
    </Row>
  );
};
