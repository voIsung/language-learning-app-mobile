import './gesture-handler';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';
import LoginRegisterScreen from './screens/LoginRegisterScreen';
import Dashboard from './screens/Dashboard';
import Lessons from './screens/Lessons';
import Exercises from './screens/Exercises';
import ProfileSettings from './screens/ProfileSettings';
import LessonDetails from './screens/LessonDetails';
import ExerciseTasks from './screens/ExerciseTasks';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Lessons" component={Lessons} />
      <Drawer.Screen name="Exercises" component={Exercises} />
      <Drawer.Screen name="Profile Settings" component={ProfileSettings} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginRegister">
          <Stack.Screen
            name="LoginRegister"
            component={LoginRegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LessonDetails"
            component={LessonDetails}
            options={{ title: 'Lesson Details' }}
          />
          <Stack.Screen
            name="ExerciseTasks"
            component={ExerciseTasks}
            options={{ title: 'Exercise' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
    </PaperProvider>
  );
}

