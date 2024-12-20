import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.43.143:3000'; // Replace with your IP for physical device testing
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentSkillLevel, setCurrentSkillLevel] = useState('Beginner');
  const [lessonHistory, setLessonHistory] = useState([]);
  const [exerciseResults, setExerciseResults] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const syncWithServer = async (url, data, idField = 'id') => {
    try {
      for (const item of data) {
        if (item[idField]) {
          await axios.put(`${url}/${item[idField]}`, item);
        } else {
          const response = await axios.post(url, item);
          item[idField] = response.data[idField]; // Update ID locally
        }
      }
      console.log(`Data synced with server at ${url}`);
    } catch (error) {
      console.error(`Error syncing data with server at ${url}:`, error);
    }
  };

  const loadStoredData = async () => {
    try {
      const storedLessons = await AsyncStorage.getItem('lessonHistory');
      const storedExercises = await AsyncStorage.getItem('exerciseResults');
      if (storedLessons) setLessonHistory(JSON.parse(storedLessons));
      if (storedExercises) setExerciseResults(JSON.parse(storedExercises));

      const lessonsResponse = await axios.get(`${API_BASE_URL}/lessons`);
      const exercisesResponse = await axios.get(`${API_BASE_URL}/exercises`);
      setLessonHistory(lessonsResponse.data);
      setExerciseResults(exercisesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      AsyncStorage.setItem('lessonHistory', JSON.stringify(lessonHistory));
      syncWithServer(`${API_BASE_URL}/lessons`, lessonHistory);
    }
  }, [lessonHistory]);

  useEffect(() => {
    if (isDataLoaded) {
      AsyncStorage.setItem('exerciseResults', JSON.stringify(exerciseResults));
      syncWithServer(`${API_BASE_URL}/exercises`, exerciseResults);
    }
  }, [exerciseResults]);

  return (
    <AppContext.Provider
      value={{
        currentSkillLevel,
        setCurrentSkillLevel,
        lessonHistory,
        setLessonHistory,
        exerciseResults,
        setExerciseResults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
