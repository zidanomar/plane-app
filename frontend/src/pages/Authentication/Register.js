import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';

function Register() {
  function validateFirstName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    } else if (value.toLowerCase() === 'naruto') {
      error = 'Username already exist 😱';
    }
    return error;
  }

  function validatePassword(value) {
    let error;

    if (!value) error = 'Password is required 😱';

    return error;
  }

  const registerHandler = (userData) => {
    // do some action
  };

  return (
    <Container
      maxW='container.xl'
      py='20'
      display='flex'
      justifyContent='center'
    >
      <Box w='lg' maxW='100%'>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            registerHandler(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name='email' validate={validateFirstName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input {...field} id='email' placeholder='email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='password' validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor='password'>password</FormLabel>
                    <Input
                      {...field}
                      id='password'
                      type='password'
                      placeholder='password'
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme='purple'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Register;
