import React, { useState } from 'react';
import { captureScreen } from 'react-native-view-shot';
import { ArrowLeft } from 'phosphor-react-native';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';

import { styles } from './styles';
import { Button } from '../Button';
import { Copyrights } from '../Copyrights';

interface FormProps {
  feedbackType: FeedbackType
}

export function Form({ feedbackType }: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'png',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(err => console.log(err));
  }

  function handleRemoveScreenshot() {
    setScreenshot(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            style={styles.image}
            source={feedbackTypeInfo.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        multiline
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot} 
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />

        <Button
          isLoading={false}
        />
      </View>

      <Copyrights />
    </View>
  );
}