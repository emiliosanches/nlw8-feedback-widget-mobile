import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import successImage from '../../assets/success.png';
import { Copyrights } from '../Copyrights';

import { styles } from './styles';

interface SuccessProps {
  restartFeedback: () => void;
}

export function Success({ restartFeedback }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image
        source={successImage}
        style={styles.image}
      />

      <Text style={styles.title}>Agradecemos o feedback!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={restartFeedback}
      >
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyrights />
    </View>
  );
}