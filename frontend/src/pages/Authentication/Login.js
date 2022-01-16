import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link as ReachLink } from 'react-router-dom';
import * as Yup from 'yup';

import { login } from '../../flux/actions/authAction';

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password Is Too Short!')
      .max(18, 'Password Is Too Long!')
      .required('Password Is Required'),
  });

  const loginHandler = (userData) => {
    dispatch(login(userData, navigate));
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
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SigninSchema}
          onSubmit={(values, actions) => {
            loginHandler(values);
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name='email'>
                {({ field }) => (
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input {...field} id='email' placeholder='email' />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='password'>
                {({ field }) => (
                  <FormControl isInvalid={errors.password && touched.password}>
                    <FormLabel htmlFor='password'>password</FormLabel>
                    <Input
                      {...field}
                      id='password'
                      type='password'
                      placeholder='password'
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme='teal' type='submit'>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Text fontSize='lg' mt='8'>
          dont have account?{' '}
          <Link as={ReachLink} to='/auth/register'>
            register now
          </Link>
        </Text>
      </Box>
    </Container>
  );
}

export default Login;
