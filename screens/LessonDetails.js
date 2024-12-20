import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.43.143:3000';// Replace localhost with your computer's IP if needed

const LessonDetails = ({ route }) => {
  const { lessonId, lessonTitle } = route.params;
  const { lessonHistory, setLessonHistory } = useAppContext();

  const isLessonCompleted = lessonHistory.some((lesson) => lesson.lessonId === lessonId);

  const markLessonCompleted = async () => {
    if (!isLessonCompleted) {
      const updatedLessonHistory = [...lessonHistory, { lessonId, status: 'completed' }];
      setLessonHistory(updatedLessonHistory);

      try {
        // Update AsyncStorage
        console.log('Updating AsyncStorage...');
        const storedLessonHistory = JSON.stringify(updatedLessonHistory);
        await AsyncStorage.setItem('lessonHistory', storedLessonHistory);

        // Update JSON server
        console.log('Updating JSON Server...');
        await axios.patch(`${API_BASE_URL}/lessons/${lessonId}`, { status: 'completed' });

        console.log('Lesson marked as completed:', lessonId);
      } catch (error) {
        console.error('Failed to update lesson:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{lessonTitle}</Text>
      <Text style={styles.lessonContent}>
        This is the content of the lesson. Add detailed information, examples, and exercises here.
      </Text>
      <Button
        mode="contained"
        onPress={markLessonCompleted}
        disabled={isLessonCompleted}
        style={styles.markButton}
      >
        {isLessonCompleted ? 'Completed' : 'Mark as Completed'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lessonContent: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'justify',
  },
  markButton: {
    backgroundColor: '#4caf50',
    marginTop: 20,
  },
});

export default LessonDetails;
