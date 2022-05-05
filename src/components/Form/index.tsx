import React, { useState } from 'react';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { ArrowLeft } from 'phosphor-react-native';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { api } from '../../libs/api';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { Copyrights } from '../Copyrights';

import { styles } from './styles';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCancelled: () => void;
  onFeedbackSubmitted: () => void;
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedbackSubmitted }: FormProps) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

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

  async function handleFeedbackSubmit() {
    onFeedbackSubmitted();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancelled}>
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
        onChangeText={setComment}
        multiline
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot} 
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />

        <Button
          isLoading={isSendingFeedback}
          onPress={handleFeedbackSubmit}
        />
      </View>

      <Copyrights />
    </View>
  );
}