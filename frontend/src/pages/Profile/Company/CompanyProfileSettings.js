import React, { useEffect, useState } from 'react';
import {
  Badge,
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
import PlaneListTable from '../../../components/Table/PlaneListTable';
import { updatePlane } from '../../../flux/actions/planeAction';

function CompanyProfileSettings() {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const company = useSelector((state) => state.company.companyDetail);

  const [currentData, setCurrentData] = useState({});
  const [imgPreview, setImgPreview] = useState(null);
  const [selectedPlane, setSelectedPlane] = useState({});
  const [currentPlaneData, setCurrentPlaneData] = useState({});
  const [planeImgPreview, setPlaneImgPreview] = useState(null);

  const CompanySchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    imgUrl: Yup.string().required('Required'),
  });

  const PlaneSchema = Yup.object().shape({
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

  const updatePlaneHandler = (planeData) => {
    if (
      planeData.name !== currentPlaneData.name ||
      planeData.imgUrl !== currentPlaneData.imgUrl
    ) {
      dispatch(updatePlane(selectedPlane.uuid, planeData));
      setPlaneImgPreview(null);
      setSelectedPlane({
        ...selectedPlane,
        name: planeData.name,
        imgUrl: planeData.imgUrl,
      });
    }
  };

  const previewImageHandler = (e) => {
    setImgPreview(e.target.value);
  };

  const previewPlaneImageHandler = (e) => {
    setPlaneImgPreview(e.target.value);
  };

  const selectPlaneHandler = (planeData) => {
    setSelectedPlane(planeData);
    setCurrentPlaneData(planeData);
  };

  useEffect(() => {
    dispatch(getCompanyByUser());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(company).length > 0) {
      setCurrentData(company);
      setSelectedPlane(company.planes[0]);
      setCurrentPlaneData(company.planes[0]);
    }
  }, [company]);

  return (
    <VStack spacing={6}>
      <Grid w={'100%'} templateColumns='repeat(3, 1fr)' gap={6}>
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
                      <FormControl
                        isInvalid={errors.name && touched.name}
                        mb={6}
                      >
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
                  <Text textAlign='center'>There's no image changes yet</Text>
                )}
              </Box>
            </Box>
          </Grid>
        </GridItem>
      </Grid>
      <Grid w={'100%'} templateColumns='repeat(2, 1fr)' gap={6}>
        <Box
          w='100%'
          h='max-content'
          backgroundColor={colorMode === 'light' ? 'white' : 'gray.700'}
          padding={6}
          borderRadius={8}
        >
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={6}
          >
            <Box w='100%'>
              <Image
                borderRadius={6}
                src={selectedPlane?.imgUrl}
                alt='logo'
                w={'100%'}
                h={200}
                objectFit='cover'
                objectPosition='center'
              />
            </Box>
            <VStack align='start'>
              <Heading textAlign='start'>{selectedPlane?.name}</Heading>
              <Text>Aircraft Number : {selectedPlane.aircraft_number}</Text>
              <Text>Tail Number : {selectedPlane.tail_number}</Text>
              <Text>
                Status :{' '}
                <Badge colorScheme={selectedPlane.isDelivered ? 'teal' : 'red'}>
                  {selectedPlane.isDelivered
                    ? 'Delivered'
                    : 'Processing at TAI'}
                </Badge>
              </Text>
            </VStack>
            <GridItem colSpan={2}>
              {selectedPlane.isDelivered ? (
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                  <Formik
                    initialValues={{
                      name: selectedPlane.name,
                      imgUrl: selectedPlane.imgUrl,
                    }}
                    validationSchema={PlaneSchema}
                    onSubmit={(values, actions) => {
                      updatePlaneHandler(values);
                      actions.setSubmitting(false);
                    }}
                    enableReinitialize
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <Field name='name'>
                          {({ field }) => (
                            <FormControl
                              isInvalid={errors.name && touched.name}
                              mb={6}
                            >
                              <FormLabel htmlFor='planeName'>
                                {currentData.name}
                              </FormLabel>
                              <Input
                                {...field}
                                id='planeName'
                                placeholder='name'
                              />
                              <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name='imgUrl'>
                          {({ field }) => (
                            <FormControl
                              isInvalid={errors.imgUrl && touched.imgUrl}
                            >
                              <FormLabel htmlFor='planeImg'>
                                Image Url
                              </FormLabel>
                              <Input
                                {...field}
                                id='planeImg'
                                type='imgUrl'
                                placeholder='imgUrl'
                                onChange={(e) => {
                                  field.onChange(e);
                                  previewPlaneImageHandler(e);
                                }}
                              />
                              <FormErrorMessage>
                                {errors.imgUrl}
                              </FormErrorMessage>
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
                      {planeImgPreview ? (
                        <Image
                          src={planeImgPreview}
                          alt='preview'
                          objectFit='contain'
                          objectPosition='center'
                        />
                      ) : (
                        <Text textAlign='center'>
                          There's no image changes yet
                        </Text>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ) : (
                <Text textAlign='center'>
                  You can update plane detail after delivery process is done
                </Text>
              )}
            </GridItem>
          </Grid>
        </Box>
        <VStack
          spacing={6}
          w='100%'
          h='max-content'
          backgroundColor={colorMode === 'light' ? 'white' : 'gray.700'}
          padding={6}
          borderRadius={8}
        >
          <PlaneListTable
            caption={`${company?.name} plane list`}
            planes={company?.planes}
            onClick={selectPlaneHandler}
            activeState={selectedPlane?.uuid}
          />
        </VStack>
      </Grid>
    </VStack>
  );
}

export default CompanyProfileSettings;
