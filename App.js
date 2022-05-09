import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import Search from './components/Search';
import Profile from './components/Profile';
import MealDetails from './components/MealDetails';
import FilteredList from './components/FilteredList';

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
              tabBarVisible:false // mealdetails-nimistä täppää ei näy alapalkissa
      
            }}/>
        <Tab.Screen name='FilteredList' component={FilteredList}
          options={{
            tabBarButton: () => null,
            tabBarVisible:false // filteredlist-nimistä täppää ei näy alapalkissa
    
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
