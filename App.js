import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Search from './components/Search';
import Profile from './components/Profile';
import MealDetails from './components/MealDetails';
import FilteredList from './components/FilteredList';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Search' component={Search}
            options={{
              tabBarIcon: () => (
                <Icon name="search" color="blue" />)
            }} />
        <Tab.Screen name='Profile' component={Profile}
            options={{
                  tabBarIcon: () => (
                    <Icon name="favorite" color="blue" />)
                }} />
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
