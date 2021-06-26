import React, {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Provider} from 'react-redux';
import {getLocales} from 'react-native-localize';

import {loadTheme} from './ts/shared/theme';
import SplashScreen from 'react-native-splash-screen';
import {loadLocale} from './ts/shared/utils/locale';
import AppNavigator from './ts/navigation/AppNavigator';
import store from './ts/store/store';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();

  const [{languageCode, isRTL}] = getLocales();
  const theme = loadTheme(colorScheme || 'light', isRTL);

  useEffect(() => {
    (async () => {
      loadLocale('en');
      setIsLoading(false);
      SplashScreen.hide();
    })();
  }, [languageCode]);

  if (isLoading) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
