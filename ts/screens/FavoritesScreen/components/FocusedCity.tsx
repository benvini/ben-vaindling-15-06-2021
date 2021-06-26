import React from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';

import {FocusedCityType} from '../../../types/types';
import {Typography} from '../../../shared/components';

type Props = {
  city: FocusedCityType;
};

const Container = styled.View`
  padding: 4px;
  margin-bottom: 8px;
  align-items: center;
`;

const CityPropContainer = styled.View`
  flex-direction: row;
`;

const BoldTypography = styled(Typography)`
  font-weight: bold;
`;

const FocusedCity = ({city}: Props) => {
  const {t} = useTranslation('focusedCity');
  const {name, country, region, timezone} = city;
  return (
    <Container>
      <CityPropContainer>
        <BoldTypography>{t('city')} </BoldTypography>
        <Typography>{name}</Typography>
      </CityPropContainer>
      <CityPropContainer>
        <BoldTypography>{t('country')} </BoldTypography>
        <Typography>{country}</Typography>
      </CityPropContainer>
      <CityPropContainer>
        <BoldTypography>{t('region')} </BoldTypography>
        <Typography>{region}</Typography>
      </CityPropContainer>
      <CityPropContainer>
        <BoldTypography>{t('timezone')} </BoldTypography>
        <Typography>{timezone}</Typography>
      </CityPropContainer>
    </Container>
  );
};

export default FocusedCity;
