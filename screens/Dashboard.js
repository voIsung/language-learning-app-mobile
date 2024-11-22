import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Chip, ProgressBar } from 'react-native-paper';

const Dashboard = () => {
  // Mocked data for progress and levels
  const progress = 0.6; // 60% progress
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Card for Progress Summary */}
      <Card style={styles.card}>
        <Card.Title title="Progress Summary" />
        <Card.Content>
          <Text style={styles.progressLabel}>Lessons Completed</Text>
          <ProgressBar progress={progress} color="#007bff" style={styles.progressBar} />
          <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>
        </Card.Content>
      </Card>

      {/* Difficulty Levels */}
      <Text style={styles.sectionHeader}>Difficulty Levels</Text>
      <View style={styles.chipContainer}>
        {difficultyLevels.map((level, index) => (
          <Chip key={index} style={styles.chip}>
            {level}
          </Chip>
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    margin: 4,
    backgroundColor: '#e3f2fd',
  },
});

export default Dashboard;
