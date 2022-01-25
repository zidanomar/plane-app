import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import {
  getCompanyByUser,
  updateCompany,
} from '../../../flux/actions/companyAction';
import { Field, Form, Formik } from 'formik';

function CompanyProfileSettings() {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const company = useSelector((state) => state.company.companyDetail);

  const [currentData, setCurrentData] = useState({});
  const [imgPreview, setImgPreview] = useState(null);

  const CompanySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    imgUrl: Yup.string().required('Required'),
  });

  const updateHandler = (companyData) => {
    if (
      companyData.name !== currentData.name ||
      companyData.imgUrl !== currentData.imgUrl
    ) {
      dispatch(updateCompany(company.uuid, companyData));
      setImgPreview(null);
    }
  };

  const previewImageHandler = (e) => {
    setImgPreview(e.target.value);
  };

  useEffect(() => {
    dispatch(getCompanyByUser());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(company).length > 0) {
      setCurrentData(company);
    }
  }, [company]);

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
      <VStack
        spacing={6}
        w='100%'
        h='max-content'
        backgroundColor={colorMode === 'light' ? 'white' : 'gray.700'}
        padding={6}
        borderRadius={8}
      >
        <Box w='100%'>
          <Image src={company.imgUrl} alt='logo' />
        </Box>
        <Heading textAlign='center'>{company?.name}</Heading>
      </VStack>
      <GridItem
        w='100%'
        backgroundColor={colorMode === 'light' ? 'white' : 'gray.700'}
        padding={6}
        borderRadius={8}
        colSpan={2}
      >
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <Formik
            initialValues={{
              name: company.name,
              imgUrl: company.imgUrl,
            }}
            validationSchema={CompanySchema}
            onSubmit={(values, actions) => {
              updateHandler(values);
              actions.setSubmitting(false);
            }}
            enableReinitialize
          >
            {({ errors, touched }) => (
              <Form>
                <Field name='name'>
                  {({ field }) => (
                    <FormControl isInvalid={errors.name && touched.name} mb={6}>
                      <FormLabel htmlFor='name'>{currentData.name}</FormLabel>
                      <Input {...field} id='name' placeholder='name' />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='imgUrl'>
                  {({ field }) => (
                    <FormControl isInvalid={errors.imgUrl && touched.imgUrl}>
                      <FormLabel htmlFor='imgUrl'>Image Url</FormLabel>
                      <Input
                        {...field}
                        id='imgUrl'
                        type='imgUrl'
                        placeholder='imgUrl'
                        onChange={(e) => {
                          field.onChange(e);
                          previewImageHandler(e);
                        }}
                      />
                      <FormErrorMessage>{errors.imgUrl}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button mt={4} colorScheme='teal' type='submit'>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>

          <Box>
            <Text textAlign='center' mb={6}>
              Image Preview
            </Text>
            <Box borderRadius={6} overflow='hidden'>
              {imgPreview ? (
                <Image
                  src={imgPreview}
                  alt='preview'
                  objectFit='contain'
                  objectPosition='center'
                />
              ) : (
                <Text>There's no image changes yet</Text>
              )}
            </Box>
          </Box>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default CompanyProfileSettings;
