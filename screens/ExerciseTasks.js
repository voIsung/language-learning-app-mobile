import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Countdown from 'react-countdown';

const ExerciseTasks = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [score, setScore] = useState(0); // Example score
  const [timerKey, setTimerKey] = useState(Date.now()); // Unique key to control timer reset/stop

  const handleExerciseEnd = () => {
    setExerciseCompleted(true);
    setTimerKey(0); // Stop the timer by giving it an invalid date
    setScore(Math.floor(Math.random() * 100)); // Example logic to generate a score
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const renderCountdown = ({ minutes, seconds, completed }) => {
    if (completed || exerciseCompleted) {
      return <Text style={styles.timer}>00:00</Text>;
    } else {
      return (
        <Text style={styles.timer}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercise Tasks</Text>

      {/* Countdown Timer */}
      <Text style={styles.timerLabel}>Time Remaining:</Text>
      {timerKey !== 0 && (
        <Countdown
          key={timerKey} // Use a key to control when the timer resets or stops
          date={timerKey + 60000} // 60 seconds from the timer's start
          renderer={renderCountdown}
          onComplete={handleExerciseEnd}
        />
      )}

      {/* End Exercise Button */}
      {!exerciseCompleted && (
        <Button
          mode="contained"
          onPress={handleExerciseEnd}
          style={styles.startButton}
        >
          End Exercise
        </Button>
      )}

      {/* Dialog for Results */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>Exercise Completed</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>Your Score: {score}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  timerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ExerciseTasks;
