import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppContext } from '../context/AppContext';

const ExerciseTasks = ({ route }) => {
  const { exerciseType } = route.params;
  const { exerciseResults, setExerciseResults } = useAppContext();

  const [score, setScore] = useState(() => {
    const existingResult = exerciseResults.find((exercise) => exercise.exerciseId === exerciseType);
    return existingResult ? existingResult.score : null;
  });

  const submitExercise = () => {
    const newScore = Math.floor(Math.random() * 100); // Simulate a random score
    setScore(newScore);

    const updatedResults = exerciseResults.filter((exercise) => exercise.exerciseId !== exerciseType);
    updatedResults.push({ exerciseId: exerciseType, score: newScore });

    setExerciseResults(updatedResults);
    console.log('Exercise completed:', exerciseType, updatedResults);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercise: {exerciseType}</Text>
      {score !== null ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Your Score: {score}</Text>
          <Button mode="outlined" onPress={submitExercise} style={styles.retryButton}>
            Retry Exercise
          </Button>
        </View>
      ) : (
        <Button mode="contained" onPress={submitExercise} style={styles.submitButton}>
          Submit Exercise
        </Button>
      )}
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
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    marginBottom: 20,
  },
  retryButton: {
    borderColor: '#007bff',
    marginBottom: 20,
  },
});

export default ExerciseTasks;
