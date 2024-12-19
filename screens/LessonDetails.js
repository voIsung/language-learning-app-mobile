import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppContext } from '../context/AppContext';

const LessonDetails = ({ route }) => {
  const { lessonId, lessonTitle } = route.params;
  const { lessonHistory, setLessonHistory } = useAppContext();

  const isLessonCompleted = (lessonId) =>
    lessonHistory.some((lesson) => lesson.lessonId === lessonId);

  const markLessonCompleted = () => {
    if (!isLessonCompleted(lessonId)) {
      const updatedLessonHistory = [...lessonHistory, { lessonId, status: 'completed' }];
      setLessonHistory(updatedLessonHistory);
      console.log('Lesson marked as completed:', lessonId, updatedLessonHistory);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{lessonTitle}</Text>
      <Text style={styles.lessonContent}>
        This is the content of the lesson. Here, you can add detailed information, examples, and exercises for the user to complete.
      </Text>
      <Button
        mode="contained"
        onPress={markLessonCompleted}
        disabled={isLessonCompleted(lessonId)}
        style={styles.markButton}
      >
        {isLessonCompleted(lessonId) ? 'Completed' : 'Mark as Completed'}
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
