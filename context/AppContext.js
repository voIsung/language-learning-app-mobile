import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentSkillLevel, setCurrentSkillLevel] = useState('Beginner');
  const [languagePreferences, setLanguagePreferences] = useState('English');
  const [lessonHistory, setLessonHistory] = useState([]); // Completed lessons
  const [exerciseResults, setExerciseResults] = useState([]); // Exercise results
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Flag to track when data is loaded

  // AsyncStorage keys
  const SKILL_LEVEL_KEY = 'currentSkillLevel';
  const LESSON_HISTORY_KEY = 'lessonHistory';
  const LANGUAGE_PREFERENCES_KEY = 'languagePreferences';
  const EXERCISE_RESULTS_KEY = 'exerciseResults';

  // Load data from AsyncStorage on app initialization
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedSkillLevel = await AsyncStorage.getItem(SKILL_LEVEL_KEY);
        const storedLessonHistory = await AsyncStorage.getItem(LESSON_HISTORY_KEY);
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_PREFERENCES_KEY);
        const storedExerciseResults = await AsyncStorage.getItem(EXERCISE_RESULTS_KEY);

        if (storedSkillLevel) setCurrentSkillLevel(storedSkillLevel);
        if (storedLessonHistory) setLessonHistory(JSON.parse(storedLessonHistory) || []);
        if (storedLanguage) setLanguagePreferences(storedLanguage);
        if (storedExerciseResults) setExerciseResults(JSON.parse(storedExerciseResults) || []);

        console.log('Data loaded from AsyncStorage:', {
          storedSkillLevel,
          storedLessonHistory,
          storedLanguage,
          storedExerciseResults,
        });
      } catch (error) {
        console.error('Failed to load data from AsyncStorage:', error);
      } finally {
        setIsDataLoaded(true); // Mark data as loaded
      }
    };

    loadStoredData();
  }, []);

  // Save `lessonHistory` to AsyncStorage whenever it changes, but only after data is loaded
  useEffect(() => {
    if (isDataLoaded) {
      const saveLessonHistory = async () => {
        try {
          await AsyncStorage.setItem(LESSON_HISTORY_KEY, JSON.stringify(lessonHistory));
          console.log('Lesson history saved to AsyncStorage:', lessonHistory);
        } catch (error) {
          console.error('Failed to save lesson history:', error);
        }
      };

      saveLessonHistory();
    }
  }, [lessonHistory, isDataLoaded]);

  // Save `exerciseResults` to AsyncStorage whenever it changes
  useEffect(() => {
    if (isDataLoaded) {
      const saveExerciseResults = async () => {
        try {
          await AsyncStorage.setItem(EXERCISE_RESULTS_KEY, JSON.stringify(exerciseResults));
          console.log('Exercise results saved to AsyncStorage:', exerciseResults);
        } catch (error) {
          console.error('Failed to save exercise results:', error);
        }
      };

      saveExerciseResults();
    }
  }, [exerciseResults, isDataLoaded]);

  // Save `currentSkillLevel` to AsyncStorage whenever it changes
  useEffect(() => {
    if (isDataLoaded) {
      const saveSkillLevel = async () => {
        try {
          await AsyncStorage.setItem(SKILL_LEVEL_KEY, currentSkillLevel);
          console.log('Skill level saved to AsyncStorage:', currentSkillLevel);
        } catch (error) {
          console.error('Failed to save skill level:', error);
        }
      };

      saveSkillLevel();
    }
  }, [currentSkillLevel, isDataLoaded]);

  // Save `languagePreferences` to AsyncStorage whenever it changes
  useEffect(() => {
    if (isDataLoaded) {
      const saveLanguagePreferences = async () => {
        try {
          await AsyncStorage.setItem(LANGUAGE_PREFERENCES_KEY, languagePreferences);
          console.log('Language preferences saved to AsyncStorage:', languagePreferences);
        } catch (error) {
          console.error('Failed to save language preferences:', error);
        }
      };

      saveLanguagePreferences();
    }
  }, [languagePreferences, isDataLoaded]);

  return (
    <AppContext.Provider
      value={{
        currentSkillLevel,
        setCurrentSkillLevel,
        languagePreferences,
        setLanguagePreferences,
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
