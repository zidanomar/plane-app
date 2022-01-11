import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../flux/actions/authAction';
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'First Name Is Too Short!')
      .max(50, 'First Name Is Too Long!')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .required('First Name Is Required'),
    surename: Yup.string()
      .min(2, 'Last Name Is Too Short!')
      .max(50, 'Last Name Is Too Long!')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .required('Last Name Is Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string()
      .min(2, 'Username Is  Too Short!')
      .max(50, 'Username Is  Too Long!')
      .required('Username Is  Required'),
    password: Yup.string()
      .min(6, 'Password Is Too Short!')
      .max(18, 'Password Is Too Long!')
      .required('Password Is Required'),
    dateOfBirth: Yup.string().required('Date Of Birth Is Required'),
    gender: Yup.string().required('Gender Is Required'),
  });

  const registerHandler = (userData) => {
    // let userDataObj = {
    //   name: userData.name,
    //   surename: userData.surename,
    //   gender: userData.gender,
    //   dateOfBirth: userData.date,
    //   email: ,
    //   username: 'johndoe',
    //   role: 'company',
    //   password: 'password',
    // };
    dispatch(register(userData, navigate));
  };

  const monthNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  };

  const yearNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className='p-ml-2'
        style={{ lineHeight: 1 }}
      />
    );
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
            name: '',
            surename: '',
            email: '',
            username: '',
            password: '',
            dateOfBirth: '',
            gender: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            registerHandler(values);
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name='username'>
                {({ field }) => (
                  <FormControl isInvalid={errors.username && touched.username}>
                    <FormLabel
                      htmlFor='username'
                      style={{ marginTop: 'var(--chakra-space-4)' }}
                    >
                      Username
                    </FormLabel>
                    <Input {...field} id='username' placeholder='username' />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='email'>
                {({ field }) => (
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel
                      htmlFor='email'
                      style={{ marginTop: 'var(--chakra-space-4)' }}
                    >
                      Email
                    </FormLabel>
                    <Input {...field} id='email' placeholder='email' />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='password'>
                {({ field }) => (
                  <FormControl isInvalid={errors.password && touched.password}>
                    <FormLabel
                      htmlFor='password'
                      style={{ marginTop: 'var(--chakra-space-4)' }}
                    >
                      password
                    </FormLabel>
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
              <Flex gap={8}>
                <Field name='name'>
                  {({ field }) => (
                    <FormControl isInvalid={errors.name && touched.name}>
                      <FormLabel
                        htmlFor='name'
                        style={{ marginTop: 'var(--chakra-space-4)' }}
                      >
                        Name
                      </FormLabel>
                      <Input {...field} id='name' placeholder='First Name' />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='surename'>
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.surename && touched.surename}
                    >
                      <FormLabel
                        htmlFor='surename'
                        style={{ marginTop: 'var(--chakra-space-4)' }}
                      >
                        Surename
                      </FormLabel>
                      <Input {...field} id='surename' placeholder='Last Name' />
                      <FormErrorMessage>{errors.surename}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Field name='dateOfBirth'>
                {({ field }) => (
                  <FormControl isInvalid={errors.date && touched.date}>
                    <FormLabel
                      htmlFor='dateOfBirth'
                      style={{ marginTop: 'var(--chakra-space-4)' }}
                    >
                      Date Of Birth
                    </FormLabel>
                    <Calendar
                      {...field}
                      id='dateOfBirth'
                      style={{
                        display: 'flex',
                        height: '2.5rem',
                      }}
                      placeholder='DD/MM/YYYY'
                      monthNavigator
                      yearNavigator
                      yearRange='1900:2100'
                      monthNavigatorTemplate={monthNavigatorTemplate}
                      yearNavigatorTemplate={yearNavigatorTemplate}
                    />
                    <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='gender'>
                {({ field }) => (
                  <FormControl isInvalid={errors.gender && touched.gender}>
                    <FormLabel
                      htmlFor='gender'
                      style={{ marginTop: 'var(--chakra-space-4)' }}
                    >
                      Gender
                    </FormLabel>
                    <Select {...field} id='gender' placeholder='Select option'>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </Select>
                    <FormErrorMessage>{errors.gender}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme='teal' type='submit'>
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
