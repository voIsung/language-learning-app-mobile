import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Exercises = () => {
  const navigation = useNavigation();

  // Mocked data for exercise types
  const exerciseTypes = [
    { id: '1', type: 'Gramatyka', description: 'Ćwiczenia związane z gramatyką' },
    { id: '2', type: 'Słownictwo', description: 'Rozwijanie zasobu słownictwa' },
    { id: '3', type: 'Pisanie', description: 'Zadania rozwijające umiejętność pisania' },
  ];

  // Navigate to the exercise tasks screen
  const navigateToTasks = (exerciseType) => {
    navigation.navigate('ExerciseTasks', { exerciseType });
  };

  // Render each exercise type
  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => navigateToTasks(item.type)}
    >
      <Text style={styles.exerciseType}>{item.type}</Text>
      <Text style={styles.exerciseDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rodzaje ćwiczeń</Text>
      <FlatList
        data={exerciseTypes}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
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
  exerciseItem: {
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
  exerciseType: {
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default Exercises;
