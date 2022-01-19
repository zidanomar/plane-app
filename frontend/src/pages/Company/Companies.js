import { Container, Grid, Link } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReachLink } from 'react-router-dom';

import CompanyCard from '../../components/Cards/CompanyCard';
import { getAllCompany } from '../../flux/actions/companyAction';

function Companies() {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  return (
    <Container maxW='container.xl'>
      <Grid
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {companies.map((c) => (
          <Link key={c.uuid} as={ReachLink} to={`/companies/${c.uuid}`}>
            <CompanyCard name={c.name} totalPlane={c.planes.length} />
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

export default Companies;
