import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Alert, Text, Pressable, Platform, StatusBar } from 'react-native';
import { List, Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { useCameraPermissions, CameraView } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Linking from 'expo-linking';

const Lessons = () => {
  const { lessonHistory, setLessonHistory } = useAppContext();
  const navigation = useNavigation();

  // Camera permissions
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  // Show/hide camera
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  // Lock to prevent multiple QR triggers
  const qrLock = useRef(false);

  // (Fragment z AppState został usunięty)

  const [isResetting, setIsResetting] = useState(false);

  const lessons = [
    { id: '1', title: 'Grammar' },
    { id: '2', title: 'Vocabulary' },
    { id: '3', title: 'Writing' },
  ];

  const resetLessons = () => {
    Alert.alert(
      'Reset Lessons',
      'Are you sure you want to reset all lessons? This will mark all lessons as incomplete.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setIsResetting(true);
            setLessonHistory([]);
            setTimeout(() => {
              setIsResetting(false);
              console.log('Lesson history reset');
            }, 500);
          },
        },
      ]
    );
  };

  const renderLessonItem = ({ item }) => {
    const isCompleted = lessonHistory.some((lesson) => lesson.lessonId === item.id);

    return (
      <List.Item
        title={item.title}
        description={isCompleted ? 'Completed' : 'Not Started'}
        left={() => (
          <Avatar.Icon
            size={40}
            icon={isCompleted ? 'check-circle' : 'circle-outline'}
            style={isCompleted ? styles.completedIcon : styles.defaultIcon}
          />
        )}
        right={() => (
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('LessonDetails', {
                lessonId: item.id,
                lessonTitle: item.title,
              })
            }
            style={styles.viewButton}
          >
            View Lesson
          </Button>
        )}
        style={styles.listItem}
      />
    );
  };

  // Handle scanning the QR code (YouTube-like approach)
  const handleBarcodeScanned = ({ data }) => {
    // If there's data and we haven't locked scanning
    if (data && !qrLock.current) {
      // Lock scanning to prevent multiple triggers
      qrLock.current = true;
      // Optional short delay before opening
      setTimeout(async () => {
        try {
          // Attempt to open the scanned link
          await Linking.openURL(data);
        } catch (error) {
          console.warn('Failed to open URL:', error);
        }
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      {/* Show camera if isCameraVisible */}
      {isCameraVisible && (
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
        >
          {/* On Android, optionally hide the status bar when scanning */}
          {Platform.OS === 'android' ? <StatusBar hidden /> : null}
          {/* Add an overlay with a close button, etc. */}
          <View style={styles.cameraOverlay}>
            <Icon
              name="close"
              size={40}
              color="white"
              onPress={() => {
                // Hide the camera and reset the lock
                setIsCameraVisible(false);
                qrLock.current = false;
              }}
              style={styles.cameraCloseButton}
            />
          </View>
        </CameraView>
      )}

      {/* If camera is not visible, show the regular UI */}
      {!isCameraVisible && (
        <>
          <View style={styles.middleButtonsContainer}>
            <Pressable onPress={requestPermission}>
              <Text style={styles.plainTextButton}>Request Permissions</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (isPermissionGranted) {
                  setIsCameraVisible(true);
                  qrLock.current = false; // reset lock whenever we open camera
                } else {
                  Alert.alert(
                    'Permission Required',
                    'Camera permission is required to use this feature.'
                  );
                }
              }}
              disabled={!isPermissionGranted}
            >
              <Text
                style={[
                  styles.plainTextButton,
                  { opacity: !isPermissionGranted ? 0.5 : 1 },
                ]}
              >
                Scan QR Code
              </Text>
            </Pressable>
          </View>

          <FlatList
            data={lessons}
            keyExtractor={(item) => item.id}
            renderItem={renderLessonItem}
            contentContainerStyle={styles.list}
          />

          <Button
            mode="contained"
            onPress={resetLessons}
            style={styles.resetButton}
            loading={isResetting}
          >
            Reset Lessons
          </Button>
        </>
      )}
    </View>
  );
};

export default Lessons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraOverlay: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cameraCloseButton: {
    margin: 20,
  },
  middleButtonsContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  listItem: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  completedIcon: {
    backgroundColor: '#4caf50',
  },
  defaultIcon: {
    backgroundColor: '#e0e0e0',
  },
  viewButton: {
    backgroundColor: '#007bff',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#d9534f',
  },
  plainTextButton: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginVertical: 10,
  },
});
