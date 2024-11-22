import React from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';

const Dashboard = () => {
  // Mocked data for progress summary
  const progress = 0.7; // 70% progress
  const completedLessons = 15;
  const completedExercises = 30;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Podsumowanie postępów w nauce</Text>

      {/* Overall Progress */}
      <Text style={styles.sectionTitle}>Ogólny postęp:</Text>
      <ProgressBarAndroid 
        styleAttr="Horizontal" 
        indeterminate={false} 
        progress={progress} 
        color="#007bff"
        style={styles.progressBar}
      />
      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>

      {/* Completed Lessons */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Ukończone lekcje: {completedLessons}</Text>
      </View>

      {/* Completed Exercises */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Ukończone ćwiczenia: {completedExercises}</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBar: {
    height: 20,
    marginVertical: 10,
  },
  progressText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
  },
});

export default Dashboard;
