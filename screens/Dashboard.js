import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, ProgressBar } from 'react-native-paper';

const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const Dashboard = () => {
  const progress = 0.6; // Example progress (60%)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Progress Summary Card */}
      <Card style={styles.card}>
        <Card.Title title="Progress Summary" />
        <Card.Content>
          <Text style={styles.progressLabel}>Lessons Completed</Text>
          <ProgressBar progress={progress} color="#007bff" style={styles.progressBar} />
          <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>
        </Card.Content>
      </Card>

      {/* Difficulty Levels */}
      <Text style={styles.subHeader}>Select Difficulty Level</Text>
      <View style={styles.difficultyContainer}>
        {DIFFICULTY_LEVELS.map((level) => (
          <Button
            key={level}
            mode="contained"
            onPress={() => console.log(`${level} selected`)} // Placeholder action
            style={styles.difficultyButton}
          >
            {level}
          </Button>
        ))}
      </View>
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
  card: {
    marginBottom: 20,
    elevation: 3,
  },
  progressLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#555',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: -15,
    marginVertical: 20,
  },
  difficultyButton: {
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
});

export default Dashboard;
