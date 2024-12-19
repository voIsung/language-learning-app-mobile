import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { List, Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const Lessons = () => {
  const { lessonHistory, setLessonHistory } = useAppContext();
  const navigation = useNavigation();
  const [isResetting, setIsResetting] = useState(false); // Loading state for reset button

  const lessons = [
    { id: '1', title: 'Grammar' },
    { id: '2', title: 'Vocabulary' },
    { id: '3', title: 'Writing' },
  ];

  const resetLessons = () => {
    Alert.alert(
      'Reset Lessons',
      'Are you sure you want to reset all lessons? This will mark all lessons as incomplete.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setIsResetting(true);
            setLessonHistory([]); // Clear the lesson history
            setTimeout(() => {
              setIsResetting(false);
              console.log('Lesson history reset');
            }, 500); // Optional delay for better UX
          },
        },
      ]
    );
  };

  const renderLessonItem = ({ item }) => {
    const isCompleted = lessonHistory.some((lesson) => lesson.lessonId === item.id);

    return (
      <List.Item
        title={item.title}
        description={isCompleted ? 'Completed' : 'Not Started'}
        left={() => (
          <Avatar.Icon
            size={40}
            icon={isCompleted ? 'check-circle' : 'circle-outline'}
            style={isCompleted ? styles.completedIcon : styles.defaultIcon}
          />
        )}
        right={() => (
          <Button
            mode="contained"
            onPress={() => navigation.navigate('LessonDetails', { lessonId: item.id, lessonTitle: item.title })}
            style={styles.viewButton}
          >
            View Lesson
          </Button>
        )}
        style={styles.listItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLessonItem}
        contentContainerStyle={styles.list}
      />
      <Button
        mode="contained"
        onPress={resetLessons}
        style={styles.resetButton}
        loading={isResetting}
      >
        Reset Lessons
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    paddingBottom: 20,
  },
  listItem: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  completedIcon: {
    backgroundColor: '#4caf50',
  },
  defaultIcon: {
    backgroundColor: '#e0e0e0',
  },
  viewButton: {
    backgroundColor: '#007bff',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#d9534f',
  },
});

export default Lessons;
