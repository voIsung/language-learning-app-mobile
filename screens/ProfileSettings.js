import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch, Button, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';

const ProfileSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // State for notifications toggle
  const [language, setLanguage] = useState('English'); // Default language
  const [menuVisible, setMenuVisible] = useState(false); // State for dropdown menu visibility

  // Toggle notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Dropdown menu handlers
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Handle language selection
  const selectLanguage = (lang) => {
    setLanguage(lang);
    closeMenu();
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

        {/* Language Dropdown */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Select Language</Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Button
                mode="outlined"
                onPress={openMenu}
                style={styles.dropdownButton}
              >
                {language}
              </Button>
            }
          >
            <Menu.Item onPress={() => selectLanguage('English')} title="English" />
            <Menu.Item onPress={() => selectLanguage('Spanish')} title="Spanish" />
            <Menu.Item onPress={() => selectLanguage('French')} title="French" />
            <Menu.Item onPress={() => selectLanguage('German')} title="German" />
          </Menu>
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
  dropdownButton: {
    width: 150,
  },
});

export default ProfileSettings;
