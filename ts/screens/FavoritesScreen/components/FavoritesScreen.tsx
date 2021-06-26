import React, {useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {Screen, Typography} from '../../../shared/components';
import {Favorite, WeatherState, FocusedCityType} from '../../../types/types';
import FocusedCity from './FocusedCity';
import FavoriteItem from './FavoriteItem';
import {getCityInfo} from '../../../shared/utils/api';

const ScreenContainer = styled(Screen)`
  align-items: center;
`;

const Modal = styled.Modal``;

const TouchableOpacity = styled.TouchableOpacity``;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-self: center;
`;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme: {palette}}) => palette.backgroundColor};
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  background-color: ${({theme: {palette}}) => palette.backgroundColor};
`;

const FavoritesContainer = styled.View`
  margin-top: 8px;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? '#ccc' : ({theme: {palette}}) => palette.primary)};
  align-items: center;
  height: 40px;
  margin: 8px;
  width: 120px;
`;

const FavoritesScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [focusedCity, setFocusedCity] = useState<FocusedCityType>();
  const [error, setError] = useState(false);
  const {t} = useTranslation('favoritesScreen');
  const navigation = useNavigation();
  const favorites = useSelector((state: WeatherState) => state.favorites);

  const onHomeClicked = () => {
    navigation.goBack();
  };

  const onCityClicked = useCallback(async (city: string) => {
    try {
      const res = await getCityInfo(city);
      const {
        EnglishName: cityName,
        Country: {EnglishName: country},
        Region: {EnglishName: region},
        TimeZone: {Name: timezone},
      } = res;
      const fetchedCity = {
        name: cityName,
        country,
        region,
        timezone,
      };
      setFocusedCity(fetchedCity);
      setIsModalVisible(true);
    } catch (e) {
      setError(true);
    }
  }, []);

  if (error) {
    return <Typography>{t('unableFetchCity')}</Typography>;
  }

  return (
    <ScreenContainer>
      <HeaderContainer>
        <Button onPress={onHomeClicked}>
          <Typography>{t('home')}</Typography>
        </Button>
        <Button disabled>
          <Typography>{t('favorites')}</Typography>
        </Button>
      </HeaderContainer>
      {favorites.length ? (
        <FavoritesContainer>
          {favorites.map((favorite: Favorite, index) => (
            <TouchableOpacity key={index} onPress={() => onCityClicked(favorite.city)}>
              <FavoriteItem favorite={favorite} />
            </TouchableOpacity>
          ))}
        </FavoritesContainer>
      ) : (
        <Typography>{t('noFavorites')}</Typography>
      )}
      <CenteredView>
        <Modal animationType="slide" transparent={false} visible={isModalVisible}>
          {focusedCity ? (
            <CenteredView>
              <ModalView>
                <FocusedCity city={focusedCity} />
                <Button
                  onPress={() => {
                    setIsModalVisible(false);
                  }}>
                  <Typography>{t('closeModal')}</Typography>
                </Button>
              </ModalView>
            </CenteredView>
          ) : null}
        </Modal>
      </CenteredView>
    </ScreenContainer>
  );
};

export default FavoritesScreen;
