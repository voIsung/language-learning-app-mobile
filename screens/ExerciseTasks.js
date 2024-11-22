import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ExerciseTasks = () => {
  const route = useRoute();
  const { exerciseType } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zadania ćwiczeń</Text>
      <Text style={styles.subHeader}>Typ ćwiczenia: {exerciseType}</Text>
      {/* Here you can load and display tasks based on the exerciseType */}
      <Text style={styles.tasksPlaceholder}>
        Załaduj zadania związane z {exerciseType}.
      </Text>
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
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  tasksPlaceholder: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ExerciseTasks;
