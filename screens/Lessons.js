import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Lessons = () => {
  const navigation = useNavigation();

  // Mocked data for lessons
  const lessons = [
    { id: '1', title: 'Podstawy React Native', difficulty: 'Łatwy' },
    { id: '2', title: 'Zaawansowane komponenty', difficulty: 'Średni' },
    { id: '3', title: 'Integracja z API', difficulty: 'Trudny' },
  ];

  // Navigate to the lesson details screen
  const navigateToDetails = (lessonId) => {
    navigation.navigate('LessonDetails', { lessonId });
  };

  // Render each lesson item
  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => navigateToDetails(item.id)}
    >
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text style={styles.lessonDifficulty}>Poziom: {item.difficulty}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista lekcji</Text>
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
  lessonItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  lessonDifficulty: {
    fontSize: 14,
    color: '#555',
  },
});

export default Lessons;
