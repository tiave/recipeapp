import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import Search from './components/Search';
import Profile from './components/Profile';
import MealDetails from './components/MealDetails';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Search' component={Search} />
        <Tab.Screen name='Profile' component={Profile} />
        <Tab.Screen name='MealDetails' component={MealDetails}
            options={{
              tabBarButton: () => null,
              tabBarVisible:false //hide tab bar on this screen
      
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
