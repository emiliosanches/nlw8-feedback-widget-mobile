import { View } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { Widget } from './src/components/Widget';
import { theme } from './src/theme';
import AppLoading from 'expo-app-loading';

import 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    //@ts-expect-error - There is a conflict between react 17 typings and expo-app-loading typings
    return <AppLoading />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <StatusBar
        style="light"
        backgroundColor='transparent' 
        translucent 
      />

      <Widget />
    </View>
  );
}
