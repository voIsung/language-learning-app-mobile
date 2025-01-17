import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const InactivityMonitor = () => {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  const INACTIVITY_THRESHOLD = 10000;
  const MOVEMENT_THRESHOLD = 0.1;

  const startMonitoring = () => {
    Accelerometer.setUpdateInterval(1000);
    const sub = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
    setSubscription(sub);
  };

  const stopMonitoring = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const triggerAlert = () => {
    setIsAlertVisible(true);
    Alert.alert(
      'Wakey-wakey!',
      'Time to do some exercise! 🤓',
      [
        {
          text: 'OK',
          onPress: () => {
            setIsAlertVisible(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    startMonitoring();
    return () => stopMonitoring();
  }, []);

  useEffect(() => {
    if (isAlertVisible) return;

    const isStationary =
      Math.abs(x) < MOVEMENT_THRESHOLD &&
      Math.abs(y) < MOVEMENT_THRESHOLD &&
      Math.abs(z - 1) < MOVEMENT_THRESHOLD;

    if (isStationary) {
      if (!timer) {
        const newTimer = setTimeout(() => {
          triggerAlert();
        }, INACTIVITY_THRESHOLD);
        setTimer(newTimer);
      }
    } else {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    }
  }, [x, y, z, isAlertVisible]);

  return null;
};

export default InactivityMonitor;
