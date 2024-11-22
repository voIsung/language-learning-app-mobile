import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';

const questionsData = {
  exercise1: [
    {
      id: '1',
      question: 'What is the capital of France?',
      options: ['Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      id: '2',
      question: 'Which language is primarily spoken in Brazil?',
      options: ['Spanish', 'Portuguese', 'French'],
      correctAnswer: 'Portuguese',
    },
    {
      id: '3',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5'],
      correctAnswer: '4',
    },
  ],
  exercise2: [
    {
      id: '1',
      question: 'What is the capital of Spain?',
      options: ['Madrid', 'Rome', 'Lisbon'],
      correctAnswer: 'Madrid',
    },
    {
      id: '2',
      question: 'Which ocean is the largest?',
      options: ['Atlantic', 'Indian', 'Pacific'],
      correctAnswer: 'Pacific',
    },
    {
      id: '3',
      question: 'What is 10 / 2?',
      options: ['4', '5', '6'],
      correctAnswer: '5',
    },
  ],
  exercise3: [
    {
      id: '1',
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Earth', 'Mercury'],
      correctAnswer: 'Mercury',
    },
    {
      id: '2',
      question: 'What is the chemical symbol for water?',
      options: ['O2', 'H2O', 'CO2'],
      correctAnswer: 'H2O',
    },
    {
      id: '3',
      question: 'What is 5 x 6?',
      options: ['30', '35', '25'],
      correctAnswer: '30',
    },
  ],
};

const ExerciseTasks = ({ route }) => {
  const { exerciseType } = route.params; // Get the selected exercise type
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds

  const questions = questionsData[exerciseType] || [];

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmitAnswers(); // Automatically submit when time runs out
    }
  }, [timeLeft]);

  const handleSelectAnswer = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitAnswers = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercise Tasks: {exerciseType}</Text>

      {/* Timer */}
      <Text style={styles.timer}>Time Remaining: {timeLeft}s</Text>

      {/* Questions List */}
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <RadioButton.Group
              onValueChange={(value) => handleSelectAnswer(item.id, value)}
              value={selectedAnswers[item.id] || ''}
            >
              {item.options.map((option) => (
                <RadioButton.Item
                  key={option}
                  label={option}
                  value={option}
                  style={styles.radioButton}
                />
              ))}
            </RadioButton.Group>
          </View>
        )}
      />

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmitAnswers}
        style={styles.submitButton}
        disabled={timeLeft === 0} // Disable if time is up
      >
        Submit Answers
      </Button>

      {/* Results Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>Results</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Your Score: {score}/{questions.length}
            </Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButton: {
    marginVertical: 5,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ExerciseTasks;
