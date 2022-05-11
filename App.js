import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Search from './components/Search';
import Favorites from './components/Favorites';
import MealDetails from './components/MealDetails';


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
        <Tab.Screen name='Favorites' component={Favorites}
            options={{
                  tabBarIcon: () => (
                    <Icon name="favorite" color="blue" />)
                }} />
        <Tab.Screen name='MealDetails' component={MealDetails}
            options={{
              tabBarButton: () => null,
              tabBarVisible:false // mealdetails-nimistä täppää ei näy alapalkissa
      
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};