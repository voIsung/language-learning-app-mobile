import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Avatar, Button, Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Lessons = () => {
  const navigation = useNavigation();

  // Mocked data for lessons
  const lessons = [
    { id: '1', title: 'Introduction to Grammar', status: 'completed', tooltip: 'Learn the basics of grammar.' },
    { id: '2', title: 'Intermediate Vocabulary', status: 'in-progress', tooltip: 'Expand your vocabulary.' },
    { id: '3', title: 'Advanced Writing', status: 'not-started', tooltip: 'Improve your writing skills.' },
  ];

  // Navigate to LessonDetails screen
  const handleStartLesson = (lessonId) => {
    navigation.navigate('LessonDetails', { lessonId });
  };

  // Render each lesson item
  const renderLessonItem = ({ item }) => {
    // Determine icon based on status
    let statusIcon;
    switch (item.status) {
      case 'completed':
        statusIcon = 'check-circle'; // Completed
        break;
      case 'in-progress':
        statusIcon = 'progress-clock'; // In Progress
        break;
      default:
        statusIcon = 'circle-outline'; // Not Started
    }

    return (
      <List.Item
        title={item.title}
        description={`Status: ${item.status}`}
        left={() => (
          <Avatar.Icon 
            size={40} 
            icon={statusIcon} 
            style={[styles.avatar, item.status === 'completed' && styles.completedIcon]} 
          />
        )}
        right={() => (
          <Tooltip title={item.tooltip}>
            <Button 
              mode="contained" 
              style={styles.startButton} 
              onPress={() => handleStartLesson(item.id)}
            >
              Start
            </Button>
          </Tooltip>
        )}
        style={styles.listItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lessons</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLessonItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  listItem: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    backgroundColor: '#e0e0e0',
  },
  completedIcon: {
    backgroundColor: '#4caf50',
  },
  startButton: {
    backgroundColor: '#007bff',
  },
});

export default Lessons;
