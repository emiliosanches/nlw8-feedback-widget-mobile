import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function Copyrights() {
  return (
    <View>
      <Text style={styles.text}>
        Feito com ♥ por Emilio Sanches
      </Text>
    </View>
  );
}