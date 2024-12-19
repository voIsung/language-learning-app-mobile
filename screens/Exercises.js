import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { List, Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const Exercises = () => {
  const { exerciseResults, setExerciseResults } = useAppContext();
  const navigation = useNavigation();
  const [isResetting, setIsResetting] = useState(false);

  const exercises = [
    { id: '1', title: 'Grammar Exercise' },
    { id: '2', title: 'Vocabulary Quiz' },
    { id: '3', title: 'Writing Challenge' },
  ];

  const resetScores = () => {
    Alert.alert(
      'Reset Scores',
      'Are you sure you want to reset all exercise scores?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setIsResetting(true);
            setExerciseResults([]);
            setTimeout(() => {
              setIsResetting(false);
              console.log('All exercise scores reset');
            }, 500);
          },
        },
      ]
    );
  };

  const renderExerciseItem = ({ item }) => {
    const score = exerciseResults.find((exercise) => exercise.exerciseId === item.id)?.score;

    return (
      <List.Item
        title={item.title}
        description={score !== undefined ? `Score: ${score}` : 'Not Attempted'}
        left={() => (
          <Avatar.Icon size={40} icon="pencil" style={styles.avatar} />
        )}
        right={() => (
          <Button
            mode="contained"
            onPress={() => navigation.navigate('ExerciseTasks', { exerciseType: item.id })}
            style={styles.startButton}
          >
            Start Exercise
          </Button>
        )}
        style={styles.listItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
        contentContainerStyle={styles.list}
      />
      <Button
        mode="contained"
        onPress={resetScores}
        style={styles.resetButton}
        loading={isResetting}
      >
        Reset All Scores
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
  avatar: {
    backgroundColor: '#e0e0e0',
  },
  startButton: {
    backgroundColor: '#007bff',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#d9534f',
  },
});

export default Exercises;
