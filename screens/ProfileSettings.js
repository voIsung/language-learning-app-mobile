import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, Dropdown, Provider as PaperProvider } from 'react-native-paper';

const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'French', value: 'french' },
  { label: 'German', value: 'german' },
];

const ProfileSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Notification toggle state
  const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default language

  // Toggle notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Profile Settings</Text>

        {/* Notifications Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            color="#007bff"
          />
        </View>

        {/* Dropdown for Language Selection */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Select Language</Text>
          <Dropdown
            label="Language"
            placeholder="Select Language"
            options={LANGUAGE_OPTIONS}
            value={selectedLanguage}
            onSelect={setSelectedLanguage}
            style={styles.dropdown}
          />
        </View>
      </View>
    </PaperProvider>
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    width: 150,
  },
});

export default ProfileSettings;
