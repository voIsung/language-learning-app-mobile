import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const LessonDetails = () => {
  const route = useRoute();
  const { lessonId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lesson details</Text>
      <Text style={styles.detailText}>Lesson number: {lessonId}</Text>
      {/* You can add more details about the lesson based on the lessonId here */}
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
  detailText: {
    fontSize: 18,
  },
});

export default LessonDetails;
