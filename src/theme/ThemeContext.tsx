import React, { useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

type Theme = 'dark' | 'light' | 'system'

interface ProvidedValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Context = React.createContext<ProvidedValue>({
  theme: 'system',
  setTheme: () => {
    return;
  }
});

interface Props {
  initial: Theme;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = useState<Theme>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem('theme').then((result) => {
      if (result === 'dark' || result === 'light') setTheme(result)
      else setTheme('system')
    })
  }, [])

  function handleChangeTheme(newTheme: Theme) {
    setTheme(newTheme);
  }
  
  if (!theme) return <AppLoading />
  
  const value = useMemo(() => {
    const value: ProvidedValue = {
      theme: theme === 'system' ? colorScheme || 'light' : theme,
      setTheme: handleChangeTheme,
    };
    return value;
  }, [theme, colorScheme, handleChangeTheme]);

  return(
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
});

export const useTheme = () => React.useContext(Context);
