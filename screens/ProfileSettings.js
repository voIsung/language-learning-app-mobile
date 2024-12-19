import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch, Button, Menu, Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { getFromSecureStore, deleteFromSecureStore } from '../utils/SecureStoreUtils';

const TOKEN_KEY = 'userToken';

const ProfileSettings = () => {
  const navigation = useNavigation();
  const { languagePreferences, setLanguagePreferences } = useAppContext();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [retrievedToken, setRetrievedToken] = useState(null);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const selectLanguage = (lang) => {
    setLanguagePreferences(lang);
    closeMenu();
  };

  const handleRetrieveToken = async () => {
    const token = await getFromSecureStore(TOKEN_KEY);
    setRetrievedToken(token);
    console.log('Retrieved Token:', token);
  };

  const handleLogout = async () => {
    await deleteFromSecureStore(TOKEN_KEY); // Clear the token
    setRetrievedToken(null); // Clear retrieved token state
    console.log('User logged out');
    navigation.replace('LoginRegister'); // Navigate back to login screen
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
                {languagePreferences}
              </Button>
            }
          >
            <Menu.Item onPress={() => selectLanguage('English')} title="English" />
            <Menu.Item onPress={() => selectLanguage('Spanish')} title="Spanish" />
            <Menu.Item onPress={() => selectLanguage('French')} title="French" />
            <Menu.Item onPress={() => selectLanguage('German')} title="German" />
          </Menu>
        </View>

        {/* Retrieve Token Button */}
        <Button
          mode="contained"
          onPress={handleRetrieveToken}
          style={styles.tokenButton}
        >
          Retrieve Token
        </Button>

        {retrievedToken && (
          <Text style={styles.tokenText}>Token: {retrievedToken}</Text>
        )}

        {/* Logout Button */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
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
  tokenButton: {
    backgroundColor: '#007bff',
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    borderRadius: 8,
  },
  tokenText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default ProfileSettings;
